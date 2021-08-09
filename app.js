const server = require('./app/lib/server');
const client = require('./app/lib/client');
class AppBootHook {
  constructor(app) {
    this.app = app;
    const config = app.config.rabbitHouseMqttPlugin;
    this.configServer = config.server;
    this.configClient = config.client;

    if (!config) {
      throw new Error('please config rabbitHouseMqttPlugin in config file');
    }
  }

  /**
   * 相关配置已经加载完毕
   * @see https://user-images.githubusercontent.com/40081831/47344271-a688d500-d6da-11e8-96e9-663fa9f45108.png egg框架应用加载逻辑
   */
  configDidLoad() {
    try {
      if (this.configServer) { this.app.mqttServer = server.createMqttServer(this.configServer, this.app); }
    } catch (error) {
      this.app.logger.error('[mqttServer]', 'start mqttServer failed');
      throw error;
    }
    try {
      if (this.configClient) { this.app.mqttClient = client.createMqttClient(this.configClient, this.app); }
    } catch (error) {
      this.app.logger.error('[mqttClient]', 'start mqttClient failed');
    }
  }
  /**
   * 应用即将关闭
   */
  async beforeClose() {
    // 关闭连接
    this.app.mqttServer.server.close();
    this.app.mqttClient.end(() => { this.app.logger.info('[mqttClient]', 'mqttClient closed'); });
  }

}

module.exports = AppBootHook;
