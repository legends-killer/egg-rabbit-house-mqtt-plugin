'use strict';
const aedes = require('aedes')();
const net = require('net');
const assert = require('assert');

/**
 * @param  {Object} config   框架处理之后的配置项
 * @param  {Application} app 当前的应用
 * @return {Object}          返回创建的mqttServer
 */
const createMqttServer = (config, app) => {
  assert(config.port && config.username && config.password);
  // 鉴权
  aedes.authenticate = function(_client, username, password, callback) {
    callback(null, username === config.username && password.toString() === config.password);
  };
  // 客户端连接
  aedes.on('client', function(client) {
    console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id);
  });
  // 客户端断开
  aedes.on('clientDisconnect', function(client) {
    console.log('Client Disconnected: \x1b[31m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id);
  });
  const server = net.createServer(aedes.handle);
  server.listen(config.port, function() {
    console.log('server started and listening on port ', config.port);
  });
  app.coreLogger.info(`[egg-rabbit-house-mqtt-server] mqtt server started at localhost:${config.port}`);
  return aedes;
};

module.exports = app => {
  app.addSingleton('mqttServer', createMqttServer);
};
