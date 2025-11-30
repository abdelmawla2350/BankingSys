import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import { logger } from '../utils/logger.js'

// Load environment variables
dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? logger.debug.bind(logger) : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true // Enable soft deletes
    }
  }
)

// Test database connection
export const connectDatabase = async () => {
  try {
    await sequelize.authenticate()
    logger.info('Database connection has been established successfully.')
  } catch (error) {
    logger.error('Unable to connect to the database:', error)
    throw error
  }
}

// Sync database (only in development)
export const syncDatabase = async (force = false) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ force })
      logger.info(`Database synced successfully${force ? ' (forced)' : ''}`)
    }
  } catch (error) {
    logger.error('Error syncing database:', error)
    throw error
  }
}

export default sequelize
