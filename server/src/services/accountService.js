import { Op } from 'sequelize'
import Account from '../models/Account.js'
import User from '../models/User.js'
import AccountLimits from '../models/AccountLimits.js'
import Transaction from '../models/Transaction.js'
import { logger } from '../utils/logger.js'

/**
 * Get all accounts for a user
 * @param {string} userId - User ID
 * @returns {Object} Result object
 */
export const getUserAccounts = async (userId) => {
  try {
    const accounts = await Account.findAll({
      where: { user_id: userId },
      include: [{
        model: AccountLimits,
        as: 'limits',
        required: false
      }],
      order: [['created_at', 'DESC']]
    })

    return {
      success: true,
      data: accounts
    }
  } catch (error) {
    logger.error('Get user accounts error:', error)
    return {
      success: false,
      message: 'Failed to retrieve accounts'
    }
  }
}

/**
 * Get account by ID
 * @param {string} accountId - Account ID
 * @param {string} userId - User ID (for authorization)
 * @returns {Object} Result object
 */
export const getAccountById = async (accountId, userId) => {
  try {
    const account = await Account.findOne({
      where: {
        id: accountId,
        user_id: userId
      },
      include: [{
        model: AccountLimits,
        as: 'limits',
        required: false
      }]
    })

    if (!account) {
      return {
        success: false,
        message: 'Account not found'
      }
    }

    return {
      success: true,
      data: account
    }
  } catch (error) {
    logger.error('Get account by ID error:', error)
    return {
      success: false,
      message: 'Failed to retrieve account'
    }
  }
}

/**
 * Create new account
 * @param {Object} accountData - Account data
 * @returns {Object} Result object
 */
export const createAccount = async (accountData) => {
  try {
    const { userId, accountNumber, routingNumber, type, balance = 0 } = accountData

    // Check if account number already exists
    const existingAccount = await Account.findOne({
      where: { account_number: accountNumber }
    })

    if (existingAccount) {
      return {
        success: false,
        message: 'Account number already exists'
      }
    }

    // Create account
    const account = await Account.create({
      user_id: userId,
      account_number: accountNumber,
      routing_number: routingNumber,
      type,
      balance,
      status: 'PENDING_APPROVAL'
    })

    // Create default account limits
    await AccountLimits.create({
      account_id: account.id
    })

    return {
      success: true,
      message: 'Account created successfully',
      data: account
    }
  } catch (error) {
    logger.error('Create account error:', error)
    return {
      success: false,
      message: 'Failed to create account'
    }
  }
}

/**
 * Update account
 * @param {string} accountId - Account ID
 * @param {Object} updateData - Update data
 * @param {string} userId - User ID (for authorization)
 * @returns {Object} Result object
 */
export const updateAccount = async (accountId, updateData, userId) => {
  try {
    const account = await Account.findOne({
      where: {
        id: accountId,
        user_id: userId
      }
    })

    if (!account) {
      return {
        success: false,
        message: 'Account not found'
      }
    }

    // Only allow updating certain fields
    const allowedFields = ['status']
    const filteredData = {}

    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        filteredData[key] = updateData[key]
      }
    })

    await account.update(filteredData)

    return {
      success: true,
      message: 'Account updated successfully',
      data: account
    }
  } catch (error) {
    logger.error('Update account error:', error)
    return {
      success: false,
      message: 'Failed to update account'
    }
  }
}

/**
 * Close account
 * @param {string} accountId - Account ID
 * @param {string} userId - User ID (for authorization)
 * @returns {Object} Result object
 */
export const closeAccount = async (accountId, userId) => {
  try {
    const account = await Account.findOne({
      where: {
        id: accountId,
        user_id: userId
      }
    })

    if (!account) {
      return {
        success: false,
        message: 'Account not found'
      }
    }

    if (account.balance !== 0) {
      return {
        success: false,
        message: 'Cannot close account with non-zero balance'
      }
    }

    await account.update({ status: 'CLOSED' })

    return {
      success: true,
      message: 'Account closed successfully'
    }
  } catch (error) {
    logger.error('Close account error:', error)
    return {
      success: false,
      message: 'Failed to close account'
    }
  }
}

/**
 * Get account balance
 * @param {string} accountId - Account ID
 * @param {string} userId - User ID (for authorization)
 * @returns {Object} Result object
 */
export const getAccountBalance = async (accountId, userId) => {
  try {
    const account = await Account.findOne({
      where: {
        id: accountId,
        user_id: userId
      },
      attributes: ['id', 'balance', 'currency']
    })

    if (!account) {
      return {
        success: false,
        message: 'Account not found'
      }
    }

    return {
      success: true,
      data: {
        accountId: account.id,
        balance: account.balance,
        currency: account.currency
      }
    }
  } catch (error) {
    logger.error('Get account balance error:', error)
    return {
      success: false,
      message: 'Failed to retrieve balance'
    }
  }
}

/**
 * Update account balance
 * @param {string} accountId - Account ID
 * @param {number} amount - Amount to add/subtract
 * @param {string} operation - 'ADD' or 'SUBTRACT'
 * @returns {Object} Result object
 */
export const updateAccountBalance = async (accountId, amount, operation) => {
  try {
    const account = await Account.findByPk(accountId)

    if (!account) {
      return {
        success: false,
        message: 'Account not found'
      }
    }

    let newBalance
    if (operation === 'ADD') {
      newBalance = parseFloat(account.balance) + parseFloat(amount)
    } else if (operation === 'SUBTRACT') {
      newBalance = parseFloat(account.balance) - parseFloat(amount)
      if (newBalance < 0) {
        return {
          success: false,
          message: 'Insufficient funds'
        }
      }
    } else {
      return {
        success: false,
        message: 'Invalid operation'
      }
    }

    await account.update({ balance: newBalance })

    return {
      success: true,
      data: {
        accountId: account.id,
        oldBalance: account.balance,
        newBalance,
        change: operation === 'ADD' ? amount : -amount
      }
    }
  } catch (error) {
    logger.error('Update account balance error:', error)
    return {
      success: false,
      message: 'Failed to update balance'
    }
  }
}

/**
 * Get all accounts (Admin only)
 * @param {Object} filters - Filter options
 * @returns {Object} Result object
 */
export const getAllAccounts = async (filters = {}) => {
  try {
    const { page = 1, limit = 10, userId, status, type } = filters

    const whereClause = {}
    if (userId) whereClause.user_id = userId
    if (status) whereClause.status = status
    if (type) whereClause.type = type

    const { count, rows } = await Account.findAndCountAll({
      where: whereClause,
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'first_name', 'last_name', 'email']
      }, {
        model: AccountLimits,
        as: 'limits',
        required: false
      }],
      limit,
      offset: (page - 1) * limit,
      order: [['created_at', 'DESC']]
    })

    return {
      success: true,
      data: {
        accounts: rows,
        pagination: {
          page,
          limit,
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    }
  } catch (error) {
    logger.error('Get all accounts error:', error)
    return {
      success: false,
      message: 'Failed to retrieve accounts'
    }
  }
}
