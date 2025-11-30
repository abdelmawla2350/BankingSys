import { body, param, query, validationResult } from 'express-validator'
import {
  getUserAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  closeAccount,
  getAccountBalance,
  getAllAccounts
} from '../services/accountService.js'
import { logger } from '../utils/logger.js'

/**
 * Get user accounts
 */
export const getAccounts = async (req, res) => {
  try {
    const userId = req.user.userId

    const result = await getUserAccounts(userId)

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
    logger.error('Get accounts controller error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

/**
 * Get account by ID
 */
export const getAccount = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    const result = await getAccountById(id, userId)

    if (!result.success) {
      return res.status(result.message === 'Account not found' ? 404 : 500).json({
        success: false,
        message: result.message
      })
    }

    res.json({
      success: true,
      data: result.data
    })
  } catch (error) {
    logger.error('Get account controller error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

/**
 * Create new account
 */
export const createAccountController = [
  body('accountNumber').isLength({ min: 8, max: 20 }).matches(/^\d+$/),
  body('routingNumber').isLength({ min: 9, max: 9 }).matches(/^\d+$/),
  body('type').isIn(['CHECKING', 'SAVINGS']),
  body('balance').optional().isFloat({ min: 0 }),
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

      const { accountNumber, routingNumber, type, balance } = req.body
      const userId = req.user.userId

      const result = await createAccount({
        userId,
        accountNumber,
        routingNumber,
        type,
        balance
      })

      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.message
        })
      }

      res.status(201).json({
        success: true,
        message: result.message,
        data: result.data
      })
    } catch (error) {
      logger.error('Create account controller error:', error)
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      })
    }
  }
]

/**
 * Update account
 */
export const updateAccountController = [
  param('id').isUUID(),
  body('status').optional().isIn(['ACTIVE', 'INACTIVE', 'FROZEN', 'CLOSED']),
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
      const userId = req.user.userId

      const result = await updateAccount(id, updateData, userId)

      if (!result.success) {
        return res.status(result.message === 'Account not found' ? 404 : 500).json({
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
      logger.error('Update account controller error:', error)
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      })
    }
  }
]

/**
 * Close account
 */
export const closeAccountController = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    const result = await closeAccount(id, userId)

    if (!result.success) {
      return res.status(result.message === 'Account not found' ? 404 : 400).json({
        success: false,
        message: result.message
      })
    }

    res.json({
      success: true,
      message: result.message
    })
  } catch (error) {
    logger.error('Close account controller error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

/**
 * Get account balance
 */
export const getAccountBalanceController = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.userId

    const result = await getAccountBalance(id, userId)

    if (!result.success) {
      return res.status(result.message === 'Account not found' ? 404 : 500).json({
        success: false,
        message: result.message
      })
    }

    res.json({
      success: true,
      data: result.data
    })
  } catch (error) {
    logger.error('Get account balance controller error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

/**
 * Get all accounts (Admin only)
 */
export const getAllAccountsController = async (req, res) => {
  try {
    const { page, limit, userId, status, type } = req.query

    const result = await getAllAccounts({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      userId,
      status,
      type
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
    logger.error('Get all accounts controller error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}
