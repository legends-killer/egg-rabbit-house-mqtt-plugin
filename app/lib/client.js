const mqtt = require('mqtt');
const is = require('is-type-of');
const assert = require('assert');
const Buffer = require('buffer').Buffer;
const http = require('http');
const msgMiddleware = require('./msgMiddleware');
/**
 * 启动应用时启动mqtt客户端，同时注入到app上
 * based on https://github.com/luofeng1/egg-emqtt/blob/master/lib/emqtt.js
 * @param  {Object} config  框架配置
 * @param  {Application} app 当前应用
 * @return {Object} 返回创建的mqttClient
 */
module.exports.createMqttClient = function(config, app) {
  assert(is.string(config.host), 'config.host must be String!');
  assert(is.string(config.username), 'config.username must be String!');
  assert(is.string(config.password), 'config.password must be String!');
  assert(is.string(config.clientId), 'config.clientId must be String!');

  let topicAuth = [];
  const msgMiddlewares = [];

  const mqttClient = mqtt.connect(config.host, {
    host: config.host,
    protocol: 'mqtt',
    clientId: config.clientId,
    username: config.username,
    password: config.password,
    keepalive: 60,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    rejectUnauthorized: false,
    ...config.options,
  });


  mqttClient.on('connect', () => {
    app.coreLogger.info('[egg-rabbit-house-mqtt-client] connected %s@%s:%s:%s/%s', config.host, config.username, config.password, config.clientId, config.options);
  });
  mqttClient.on('error', error => {
    app.coreLogger.error('[egg-rabbit-house-mqtt-client] error clientid:%s', config.clientId);
    app.coreLogger.error(error);
  });
  mqttClient.on('offline', () => {
    app.coreLogger.error('[egg-rabbit-house-mqtt-client] offline clientid:%s', config.clientId);
  });
  mqttClient.on('reconnect', () => {
    app.coreLogger.error('[egg-rabbit-house-mqtt-client] reconnect clientid:%s', config.clientId);
  });

  /**
   * 通过路由的方式添加订阅，拦截发布，自定义中间件处理，最后注入进ctx
   * @version 1.0.0
   * @param {string | string[]} topic 订阅topic
   */
  mqttClient.route = topic => {
    mqttClient.subscribe(topic);
    app.coreLogger.info('[egg-rabbit-house-mqtt-client] subscribe clientid:%s topic:%s', config.clientId, topic);

    const msgMiddlewareConfig = config.msgMiddleware;
    msgMiddlewares.length = 0;
    if (msgMiddlewareConfig) {
      assert(is.array(msgMiddlewareConfig), 'config.msgMiddleware must be Array!');
      for (const middleware of msgMiddlewareConfig) {
        assert(app.mqtt.middleware[middleware], `can't find middleware: ${middleware} !`);
        msgMiddlewares.push(app.mqtt.middleware[middleware]);
      }
    }
    topicAuth = topic.map(t => {
      return new RegExp('^' + t.replace('$queue/', '').replace(/^\$share\/([A-Za-z0-9]+)\//, '').replace(/([\[\]\?\(\)\\\\$\^\*\.|])/g, '\\$1')
        .replace(/\+/g, '[^/]+')
        .replace(/\/#$/, '(\/.*)?') + '$');
    });
  };

  /**
   * @param {Object} handler handler，这里传入一个controller，经过中间件之后会将封装好的ctx送入
   */
  mqttClient.handle = handler => {
    mqttClient.on('message', (top, message) => {
      let isAuthOk = false;
      for (const tAuth of topicAuth) {
        if (tAuth.test(top)) isAuthOk = true;
      }
      if (!isAuthOk) return;

      const msg = Buffer.from(message).toString('utf8');
      const request = { topic: top, msg, socket: { remoteAddress: `topic:${top} ` }, method: 'sub', userId: `${config.username}:${config.clientId}` };

      msgMiddleware(app, request, msgMiddlewares, () => {
        const ctx = app.createContext(request, new http.ServerResponse(request));
        ctx.method = request.method;
        ctx.request.body = request.body;
        ctx.url = top;
        ctx.userId = request.userId;
        ctx.starttime = Date.now();
        handler.call(ctx)
          .catch(e => {
            e.message = '[egg-rabbit-house-mqtt-client] controller execute error: ' + e.message;
            app.coreLogger.error(e);
          });
      });
    });
  };

  return mqttClient;
};
