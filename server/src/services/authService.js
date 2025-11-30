import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'
import User from '../models/User.js'
import Session from '../models/Session.js'
import { logger } from '../utils/logger.js'

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h'

/**
 * Authenticate user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Authentication result
 */
export const authenticateUser = async (email, password) => {
  try {
    // Find user by email
    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
        status: 'ACTIVE'
      }
    })

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password'
      }
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid email or password'
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    // Create session record
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    const tokenHash = await bcrypt.hash(token, 10)

    await Session.create({
      user_id: user.id,
      token_hash: tokenHash,
      expires_at: expiresAt
    })

    // Remove password from response
    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      status: user.status
    }

    return {
      success: true,
      message: 'Login successful',
      token,
      user: userResponse,
      expiresIn: JWT_EXPIRES_IN
    }
  } catch (error) {
    logger.error('Authentication error:', error)
    return {
      success: false,
      message: 'Authentication failed'
    }
  }
}

/**
 * Validate JWT token
 * @param {string} token - JWT token
 * @returns {Object} Validation result
 */
export const validateToken = async (token) => {
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET)

    // Check if session exists and is not expired
    const tokenHash = await bcrypt.hash(token, 10)
    const session = await Session.findOne({
      where: {
        token_hash: tokenHash,
        expires_at: {
          [Op.gt]: new Date()
        }
      },
      include: [{
        model: User,
        as: 'user',
        where: { status: 'ACTIVE' },
        attributes: ['id', 'email', 'first_name', 'last_name', 'role', 'status']
      }]
    })

    if (!session) {
      return {
        valid: false,
        message: 'Session expired or invalid'
      }
    }

    return {
      valid: true,
      user: session.user,
      decoded
    }
  } catch (error) {
    logger.error('Token validation error:', error)
    return {
      valid: false,
      message: 'Invalid token'
    }
  }
}

/**
 * Logout user by invalidating session
 * @param {string} token - JWT token
 * @returns {Object} Logout result
 */
export const logoutUser = async (token) => {
  try {
    const tokenHash = await bcrypt.hash(token, 10)

    const deletedCount = await Session.destroy({
      where: {
        token_hash: tokenHash
      }
    })

    if (deletedCount > 0) {
      return {
        success: true,
        message: 'Logout successful'
      }
    } else {
      return {
        success: false,
        message: 'Session not found'
      }
    }
  } catch (error) {
    logger.error('Logout error:', error)
    return {
      success: false,
      message: 'Logout failed'
    }
  }
}

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Object} Registration result
 */
export const registerUser = async (userData) => {
  try {
    const { email, password, firstName, lastName, role = 'CUSTOMER' } = userData

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      return {
        success: false,
        message: 'User with this email already exists'
      }
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create user
    const newUser = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      role,
      status: 'ACTIVE'
    })

    // Remove password from response
    const userResponse = {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      role: newUser.role,
      status: newUser.status
    }

    return {
      success: true,
      message: 'User registered successfully',
      user: userResponse
    }
  } catch (error) {
    logger.error('Registration error:', error)
    return {
      success: false,
      message: 'Registration failed'
    }
  }
}

/**
 * Clean up expired sessions (can be called periodically)
 */
export const cleanupExpiredSessions = async () => {
  try {
    const deletedCount = await Session.destroy({
      where: {
        expires_at: {
          [Op.lt]: new Date()
        }
      }
    })

    if (deletedCount > 0) {
      logger.info(`Cleaned up ${deletedCount} expired sessions`)
    }
  } catch (error) {
    logger.error('Session cleanup error:', error)
  }
}
