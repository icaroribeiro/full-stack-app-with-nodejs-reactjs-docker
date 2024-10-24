import 'reflect-metadata'

import { createServer, Server as HttpServer } from 'http'

import { Server } from './api/server'
import { config } from './config/config'
import { AppContainer } from './containers'

const run = (): void => {
  try {
    new AppContainer()
    const server: Server = new Server()
    const http: HttpServer = createServer(server.app)
    const port = parseInt(config.getPort())
    http.listen(port, () => {
      console.log('Server started successfully!')
    })
    http.on('close', () => {
      console.log('Server closed successfully!')
    })
  } catch (err) {
    console.error('Server starting failed!', err)
  }
}

run()
