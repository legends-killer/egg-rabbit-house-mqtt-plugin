import { Aedes } from "aedes"
import { Server } from "net"
import { Client } from "mqtt"
import "egg"
import { Application } from "egg"

// use decleraion merging to attach route method on mqtt client
interface MClient extends Client {
  route(topic: string | string[], handler: Application.handler): Void
}
declare module "egg" {
  interface Application {
    mqttServer: {
      aedes: Aedes
      server: Server
    }
    mqttClient: MClient
    mqtt: any
  }
  interface EggAppConfig {
    rabbitHouseMqttPlugin: {
      server: {
        port: number
        username: string
        password: string
      }
      client: {
        host: string
        clientId: string
        username: string
        password: string
        protocol: string
        msgMiddleware?: string[]
        options?: {
          keepalive?: number
          protocolId?: string
          protocolVersion?: number
          clean?: boolean
          reconnectPeriod?: number
          connectTimeout?: number
          rejectUnauthorized?: boolean
          msgMiddleware?: string[]
        }
      }
    }
  }
}
