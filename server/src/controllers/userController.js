import { body, param, validationResult } from 'express-validator'
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile
} from '../services/userService.js'
import { logger } from '../utils/logger.js'

/**
 * Get all users (Admin only)
 */
export const getUsers = async (req, res) => {
  try {
    const { page, limit, search, status, role } = req.query

    const result = await getAllUsers({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      search,
      status,
      role
    })

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message
      })
    }

    res.json({
      success: true,
      data: result.data
    })
  } catch (error) {
    logger.error('Get users controller error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

/**
 * Get user by ID
 */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params

    const result = await getUserById(id)

    if (!result.success) {
      return res.status(result.message === 'User not found' ? 404 : 500).json({
        success: false,
        message: result.message
      })
    }

    res.json({
      success: true,
      data: result.data
    })
  } catch (error) {
    logger.error('Get user controller error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

/**
 * Update user
 */
export const updateUserController = [
  param('id').isUUID(),
  body('first_name').optional().isLength({ min: 1, max: 100 }),
  body('last_name').optional().isLength({ min: 1, max: 100 }),
  body('status').optional().isIn(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Invalid input data',
          errors: errors.array()
        })
      }

      const { id } = req.params
      const updateData = req.body

      const result = await updateUser(id, updateData)

      if (!result.success) {
        return res.status(result.message === 'User not found' ? 404 : 500).json({
          success: false,
          message: result.message
        })
      }

      res.json({
        success: true,
        message: result.message,
        data: result.data
      })
    } catch (error) {
      logger.error('Update user controller error:', error)
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      })
    }
  }
]

/**
 * Delete user
 */
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params

    const result = await deleteUser(id)

    if (!result.success) {
      return res.status(result.message === 'User not found' ? 404 : 500).json({
        success: false,
        message: result.message
      })
    }

    res.json({
      success: true,
      message: result.message
    })
  } catch (error) {
    logger.error('Delete user controller error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

/**
 * Get user profile
 */
export const getUserProfileController = async (req, res) => {
  try {
    const { id } = req.params

    const result = await getUserProfile(id)

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message
      })
    }

    res.json({
      success: true,
      data: result.data
    })
  } catch (error) {
    logger.error('Get user profile controller error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

/**
 * Update user profile
 */
export const updateUserProfileController = [
  param('id').isUUID(),
  body('phone').optional().isLength({ max: 20 }),
  body('address').optional().isLength({ max: 500 }),
  body('date_of_birth').optional().isISO8601(),
  body('ssn_last_four').optional().isLength({ min: 4, max: 4 }),
  body('profile_image').optional().isURL(),
  body('two_factor_enabled').optional().isBoolean(),
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Invalid input data',
          errors: errors.array()
        })
      }

      const { id } = req.params
      const profileData = req.body

      const result = await updateUserProfile(id, profileData)

      if (!result.success) {
        return res.status(500).json({
          success: false,
          message: result.message
        })
      }

      res.json({
        success: true,
        message: result.message,
        data: result.data
      })
    } catch (error) {
      logger.error('Update user profile controller error:', error)
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      })
    }
  }
]
