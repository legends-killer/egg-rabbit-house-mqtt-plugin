import { createMqttServer } from './app/lib/server';
import { createMqttClient } from './app/lib/client';
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
   * 所有的配置已经加载完毕
   * 可以用来加载应用自定义的文件，启动自定义的服务
   */
  async didLoad() {
    try {
      if (this.configServer) { this.app.mqttServer = createMqttServer(this.configServer, this.app); }
    } catch (error) {
      this.app.logger.error('[mqttServer]', 'start mqttServer failed');
      throw error;
    }
    try {
      if (this.configClient) { this.app.mqttClient = createMqttClient(this.configClient, this.app); }
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
  }

}

module.exports = AppBootHook;
