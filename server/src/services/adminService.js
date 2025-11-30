import { Op, Sequelize } from 'sequelize'
import User from '../models/User.js'
import Account from '../models/Account.js'
import Transaction from '../models/Transaction.js'
import AuditLog from '../models/AuditLog.js'
import { logger } from '../utils/logger.js'

/**
 * Get admin dashboard data
 * @returns {Object} Dashboard data
 */
export const getDashboardData = async () => {
  try {
    // Get user statistics
    const userStats = await User.findAll({
      attributes: [
        'status',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      group: ['status']
    })

    // Get account statistics
    const accountStats = await Account.findAll({
      attributes: [
        'status',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      group: ['status']
    })

    // Get transaction statistics for last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const transactionStats = await Transaction.findAll({
      where: {
        created_at: {
          [Op.gte]: thirtyDaysAgo
        }
      },
      attributes: [
        'type',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount']
      ],
      group: ['type']
    })

    // Get total balances
    const totalBalances = await Account.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('balance')), 'total_balance'],
        [Sequelize.fn('AVG', Sequelize.col('balance')), 'avg_balance']
      ]
    })

    // Get recent transactions
    const recentTransactions = await Transaction.findAll({
      limit: 10,
      order: [['created_at', 'DESC']],
      include: [{
        model: Account,
        as: 'account',
        attributes: ['account_number'],
        include: [{
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name']
        }]
      }]
    })

    // Get recent audit logs
    const recentAuditLogs = await AuditLog.findAll({
      limit: 10,
      order: [['created_at', 'DESC']],
      include: [{
        model: User,
        as: 'user',
        attributes: ['first_name', 'last_name', 'email'],
        required: false
      }]
    })

    return {
      success: true,
      data: {
        userStats,
        accountStats,
        transactionStats,
        totalBalances: totalBalances[0],
        recentTransactions,
        recentAuditLogs
      }
    }
  } catch (error) {
    logger.error('Get dashboard data error:', error)
    return {
      success: false,
      message: 'Failed to retrieve dashboard data'
    }
  }
}

/**
 * Get all users for admin management
 * @param {Object} filters - Filter options
 * @returns {Object} Users data
 */
export const getAllUsersForAdmin = async (filters = {}) => {
  try {
    const { page = 1, limit = 10, search, status, role } = filters

    const whereClause = {}
    if (status) whereClause.status = status
    if (role) whereClause.role = role
    if (search) {
      whereClause[Op.or] = [
        { first_name: { [Op.like]: `%${search}%` } },
        { last_name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } }
      ]
    }

    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      limit,
      offset: (page - 1) * limit,
      order: [['created_at', 'DESC']]
    })

    return {
      success: true,
      data: {
        users: rows,
        pagination: {
          page,
          limit,
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    }
  } catch (error) {
    logger.error('Get all users for admin error:', error)
    return {
      success: false,
      message: 'Failed to retrieve users'
    }
  }
}

/**
 * Update user by admin
 * @param {string} userId - User ID
 * @param {Object} updateData - Update data
 * @returns {Object} Result object
 */
export const updateUserByAdmin = async (userId, updateData) => {
  try {
    const user = await User.findByPk(userId)

    if (!user) {
      return {
        success: false,
        message: 'User not found'
      }
    }

    // Only allow updating certain fields
    const allowedFields = ['first_name', 'last_name', 'status', 'role']
    const filteredData = {}

    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key)) {
        filteredData[key] = updateData[key]
      }
    })

    await user.update(filteredData)

    // Log the action
    await AuditLog.create({
      user_id: userId,
      action: 'USER_UPDATE',
      description: `User updated by admin: ${JSON.stringify(filteredData)}`,
      ip_address: null, // Would be set by middleware
      user_agent: null // Would be set by middleware
    })

    return {
      success: true,
      message: 'User updated successfully',
      data: user
    }
  } catch (error) {
    logger.error('Update user by admin error:', error)
    return {
      success: false,
      message: 'Failed to update user'
    }
  }
}

/**
 * Delete user by admin
 * @param {string} userId - User ID
 * @returns {Object} Result object
 */
export const deleteUserByAdmin = async (userId) => {
  try {
    const user = await User.findByPk(userId)

    if (!user) {
      return {
        success: false,
        message: 'User not found'
      }
    }

    // Soft delete
    await user.update({ deleted_at: new Date() })

    // Log the action
    await AuditLog.create({
      user_id: userId,
      action: 'USER_DELETE',
      description: 'User deleted by admin',
      ip_address: null,
      user_agent: null
    })

    return {
      success: true,
      message: 'User deleted successfully'
    }
  } catch (error) {
    logger.error('Delete user by admin error:', error)
    return {
      success: false,
      message: 'Failed to delete user'
    }
  }
}

/**
 * Get all transactions for admin
 * @param {Object} filters - Filter options
 * @returns {Object} Transactions data
 */
export const getAllTransactionsForAdmin = async (filters = {}) => {
  try {
    const { page = 1, limit = 10, userId, accountId, type, status, startDate, endDate } = filters

    const whereClause = {}
    if (userId) whereClause['$account.user_id$'] = userId
    if (accountId) whereClause.account_id = accountId
    if (type) whereClause.type = type
    if (status) whereClause.status = status
    if (startDate || endDate) {
      whereClause.created_at = {}
      if (startDate) whereClause.created_at[Op.gte] = new Date(startDate)
      if (endDate) whereClause.created_at[Op.lte] = new Date(endDate)
    }

    const { count, rows } = await Transaction.findAndCountAll({
      where: whereClause,
      include: [{
        model: Account,
        as: 'account',
        attributes: ['account_number'],
        include: [{
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name', 'email']
        }]
      }],
      limit,
      offset: (page - 1) * limit,
      order: [['created_at', 'DESC']]
    })

    return {
      success: true,
      data: {
        transactions: rows,
        pagination: {
          page,
          limit,
          total: count,
          pages: Math.ceil(count / limit)
        }
      }
    }
  } catch (error) {
    logger.error('Get all transactions for admin error:', error)
    return {
      success: false,
      message: 'Failed to retrieve transactions'
    }
  }
}

/**
 * Get suspicious activities
 * @returns {Object} Suspicious activities data
 */
export const getSuspiciousActivities = async () => {
  try {
    // Get large transactions (above threshold)
    const largeTransactions = await Transaction.findAll({
      where: {
        amount: { [Op.gt]: 10000 },
        created_at: {
          [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      },
      include: [{
        model: Account,
        as: 'account',
        include: [{
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name', 'email']
        }]
      }],
      order: [['amount', 'DESC']],
      limit: 20
    })

    // Get failed transactions
    const failedTransactions = await Transaction.findAll({
      where: {
        status: 'FAILED',
        created_at: {
          [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      },
      include: [{
        model: Account,
        as: 'account',
        include: [{
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name', 'email']
        }]
      }],
      order: [['created_at', 'DESC']],
      limit: 20
    })

    // Get accounts with unusual activity (many transactions in short time)
    const unusualActivity = await Transaction.findAll({
      attributes: [
        'account_id',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'transaction_count']
      ],
      where: {
        created_at: {
          [Op.gte]: new Date(Date.now() - 60 * 60 * 1000) // Last hour
        }
      },
      group: ['account_id'],
      having: Sequelize.literal('COUNT(id) > 10'),
      include: [{
        model: Account,
        as: 'account',
        include: [{
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name', 'email']
        }]
      }],
      order: [[Sequelize.literal('transaction_count'), 'DESC']],
      limit: 10
    })

    return {
      success: true,
      data: {
        largeTransactions,
        failedTransactions,
        unusualActivity
      }
    }
  } catch (error) {
    logger.error('Get suspicious activities error:', error)
    return {
      success: false,
      message: 'Failed to retrieve suspicious activities'
    }
  }
}

/**
 * Get system analytics
 * @param {Object} dateRange - Date range for analytics
 * @returns {Object} Analytics data
 */
export const getSystemAnalytics = async (dateRange = {}) => {
  try {
    const { startDate, endDate } = dateRange
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    const end = endDate ? new Date(endDate) : new Date()

    // User registration trends
    const userRegistrations = await User.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('created_at')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      where: {
        created_at: {
          [Op.between]: [start, end]
        }
      },
      group: [Sequelize.fn('DATE', Sequelize.col('created_at'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('created_at')), 'ASC']]
    })

    // Transaction volume trends
    const transactionVolume = await Transaction.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('created_at')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount']
      ],
      where: {
        created_at: {
          [Op.between]: [start, end]
        }
      },
      group: [Sequelize.fn('DATE', Sequelize.col('created_at'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('created_at')), 'ASC']]
    })

    // Account balance distribution
    const balanceDistribution = await Account.findAll({
      attributes: [
        [Sequelize.literal('CASE WHEN balance = 0 THEN \'zero\' WHEN balance < 100 THEN \'low\' WHEN balance < 1000 THEN \'medium\' WHEN balance < 10000 THEN \'high\' ELSE \'very_high\' END'), 'balance_range'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      group: [Sequelize.literal('CASE WHEN balance = 0 THEN \'zero\' WHEN balance < 100 THEN \'low\' WHEN balance < 1000 THEN \'medium\' WHEN balance < 10000 THEN \'high\' ELSE \'very_high\' END')]
    })

    return {
      success: true,
      data: {
        userRegistrations,
        transactionVolume,
        balanceDistribution,
        dateRange: { start, end }
      }
    }
  } catch (error) {
    logger.error('Get system analytics error:', error)
    return {
      success: false,
      message: 'Failed to retrieve system analytics'
    }
  }
}
