import { Aedes } from "aedes"
import { Server } from "net"
import "egg"

declare module "egg" {
  interface Application {
    mqttServer: {
      aedes: Aedes
      server: Server
    }
  }
  interface EggAppConfig {
    rabbitHouseMqttPlugin: {
      port: number
      username: string
      password: string
    }
  }
}
