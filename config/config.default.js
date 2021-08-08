/**
 * egg-rabbit-house-mqtt-plugin default config
 * @member Config rabbitHouseMqttPlugin
 * @property {Object} server The MQTT Server
 * @property {Object} client The MQTT Client
 */
exports.rabbitHouseMqttPlugin = {
  /**
   * @property {String} username The MQTT Server User Name
   * @property {String} password The MQTT Server Password
   * @property {Number} port The MQTT Server Port
   */
  server: {
    port: 1883,
    username: 'user',
    password: '123456',
  },
  /**
   * @property {String} clientId
   * @property {String} username
   * @property {String} password
   * @property {String} protocolId
   * @property {Number} keepalive
   * @property {Number} protocolVersion
   * @property {boolean} clean
   * @property {Number} reconnectPeriod
   * @property {Number} connectTimeout
   * @property {boolean} rejectUnauthorized
   * @property {Object} options
   */
  client: {
    clientId: 'egg',
    username: 'user',
    password: '123456',
    options: {
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
