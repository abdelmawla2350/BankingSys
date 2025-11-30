import express from 'express'
import { body, validationResult } from 'express-validator'
import { authenticateUser, validateToken, logoutUser } from '../services/authService.js'
import { logger } from '../utils/logger.js'

const router = express.Router()

// Login endpoint
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: errors.array()
      })
    }

    const { email, password } = req.body

    const result = await authenticateUser(email, password)

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message
      })
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: result
    })
  } catch (error) {
    logger.error('Login endpoint error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// Register endpoint
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim()
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data',
        errors: errors.array()
      })
    }

    const { email, password, firstName, lastName, role } = req.body

    const result = await registerUser({
      email,
      password,
      firstName,
      lastName,
      role: role || 'CUSTOMER'
    })

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message
      })
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: result.user
    })
  } catch (error) {
    logger.error('Registration endpoint error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// Validate token endpoint
router.post('/validate', async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }

    const token = authHeader.substring(7)
    const result = await validateToken(token)

    if (!result.valid) {
      return res.status(401).json({
        success: false,
        message: result.message
      })
    }

    res.json({
      success: true,
      message: 'Token is valid',
      user: result.user
    })
  } catch (error) {
    logger.error('Validate token error:', error)
    res.status(500).json({
      success: false,
      message: 'Token validation failed'
    })
  }
})

// Logout endpoint
router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }

    const token = authHeader.substring(7)
    const result = await logoutUser(token)

    res.json(result)
  } catch (error) {
    logger.error('Logout error:', error)
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    })
  }
})

export default router
