import app from './app.js'
import { env } from './app/config/env.js'
import { connectToMongoDB, disconnectFromMongoDB } from './lib/mongooseConnection.js'

let server: any

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception Detected')
  console.log(error)

  process.exit(1)
})

async function bootstrap() {
  try {
    // Connect to MongoDB
    await connectToMongoDB()
    
    server = app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

;(async () => {
  await bootstrap()
})()

process.on('unhandledRejection', (error) => {
  console.log('Unhandled Rejection Detected')
  console.log(error)

  if (server) {
    server.close(async () => {
      await disconnectFromMongoDB()
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
})

process.on('SIGTERM', () => {
  console.log('Server is shutting down!')

  if (server) {
    server.close(async () => {
      await disconnectFromMongoDB()
      process.exit(0)
    })
  } else {
    process.exit(0)
  }
})

process.on('SIGINT', () => {
  console.log('Server is shutting down!')

  if (server) {
    server.close(async () => {
      await disconnectFromMongoDB()
      process.exit(0)
    })
  } else {
    process.exit(0)
  }
})
