/**
 * egg-rabbit-house-mqtt-plugin default config
 * @member Config rabbitHouseMqttPlugin
 * @property {Object} server The MQTT Server
 * @property {Object} client The MQTT Client
 */
exports.rabbitHouseMqttPlugin = {
  /**
   * @param {String} host The MQTT Server host
   * @property {Number} port The MQTT Server Port
   * @property {String} username The MQTT Server User Name
   * @property {String} password The MQTT Server Password
   */
  server: {
    host: '0.0.0.0',
    port: 1883,
    username: 'user',
    password: '123456',
  },
  /**
   * @property {String} host
   * @property {String} clientId
   * @property {String} username
   * @property {String} password
   * @property {String} protocolId
   * @property {String} protocol
   * @property {Number} keepalive
   * @property {Number} protocolVersion
   * @property {boolean} clean
   * @property {Number} reconnectPeriod
   * @property {Number} connectTimeout
   * @property {boolean} rejectUnauthorized
   * @property {Object} options
   */
  client: {
    host: '127.0.0.1',
    clientId: 'egg',
    username: 'user',
    password: '123456',
    options: {
      protocol: 'mqtt',
      keepalive: 60,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      rejectUnauthorized: false,
    },
  },
};
