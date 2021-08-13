
const aedes = require('aedes')();
const net = require('net');
const server = net.createServer(aedes.handle);
const assert = require('assert');

/**
 * 启动应用时默认启动mqtt服务器，同时注入到app上
 * @param  {Object} config   框架处理之后的配置项
 * @param  {Application} app 当前的应用
 * @return {Object}          返回创建的mqttServer
 */
module.exports.createMqttServer = function(config, app) {
  assert(config.port && config.username && config.password);
  // 鉴权
  aedes.authenticate = function(_client, username, password, callback) {
    callback(null, username === config.username && password.toString() === config.password);
  };
  // 客户端连接
  aedes.on('client', function(client) {
    app.logger.info('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id);
    console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id);
  });
  // 客户端断开
  aedes.on('clientDisconnect', function(client) {
    app.logger.info('Client Disconnected: \x1b[31m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id);
    console.log('Client Disconnected: \x1b[31m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id);
  });
  server.listen(config.port, config.host, function() {
    console.log('server started and listening at', config.host, ':', config.port);
  });
  app.coreLogger.info(`[egg-rabbit-house-mqtt-server] mqtt server started at localhost:${config.port}`);
  return { aedes, server };
};
