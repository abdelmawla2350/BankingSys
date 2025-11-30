import app from './app.js'
import { connectDatabase, syncDatabase } from './config/database.js'
import { logger } from './utils/logger.js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const PORT = process.env.PORT || 3001

// Start server function
const startServer = async () => {
  try {
    // Try to connect to database (optional for development)
    try {
      await connectDatabase()
      console.log(' Database connected successfully')

      // Sync database in development
      if (process.env.NODE_ENV === 'development') {
        await syncDatabase()
      }
    } catch (dbError) {
      console.warn('  Database connection failed, but server will start anyway:', dbError.message)
      console.warn(' Make sure MySQL is running and .env is configured correctly')
    }

    // Start the server
    const server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`)
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`)
      logger.info(`Health check available at: http://localhost:${PORT}/health`)
    })

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully')
      server.close(() => {
        logger.info('Process terminated')
      })
    })

    process.on('SIGINT', () => {
      logger.info('SIGINT received, shutting down gracefully')
      server.close(() => {
        logger.info('Process terminated')
      })
    })

  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

// Start the application
startServer()
