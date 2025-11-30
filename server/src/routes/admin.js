import express from 'express'
import { getDashboardStats, getAnalyticsData, getAllUsersAdmin, getAllTransactionsAdmin } from '../services/adminService.js'

const router = express.Router()

// Get dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const result = await getDashboardStats()

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message
      })
    }

    // Format data for frontend
    const stats = result.data
    const revenueData = [
      { month: "Jan", revenue: 45000, expenses: 32000 },
      { month: "Feb", revenue: 52000, expenses: 35000 },
      { month: "Mar", revenue: 48000, expenses: 33000 },
      { month: "Apr", revenue: 61000, expenses: 38000 },
      { month: "May", revenue: 55000, expenses: 36000 },
      { month: "Jun", revenue: 67000, expenses: 40000 },
    ]

    const transactionVolumeData = [
      { day: "Mon", transactions: 234 },
      { day: "Tue", transactions: 289 },
      { day: "Wed", transactions: 312 },
      { day: "Thu", transactions: 278 },
      { day: "Fri", transactions: 345 },
      { day: "Sat", transactions: 198 },
      { day: "Sun", transactions: 156 },
    ]

    const recentTransactions = [
      { id: 1, title: "Recent Deposit", date: "2 minutes ago", amount: 2500.00, type: "income" },
      { id: 2, title: "Recent Transfer", date: "15 minutes ago", amount: 850.00, type: "expense" },
      { id: 3, title: "Recent Withdrawal", date: "1 hour ago", amount: 1200.00, type: "expense" },
      { id: 4, title: "Recent Deposit", date: "2 hours ago", amount: 3400.00, type: "income" },
    ]

    res.json({
      success: true,
      data: {
        revenueData,
        transactionVolumeData,
        recentTransactions,
        stats
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// Get analytics data
router.get('/analytics', async (req, res) => {
  try {
    const result = await getAnalyticsData()

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
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// Get all users (Admin)
router.get('/users', async (req, res) => {
  try {
    const result = await getAllUsersAdmin()

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
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

// Get all transactions (Admin)
router.get('/transactions', async (req, res) => {
  try {
    const result = await getAllTransactionsAdmin()

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
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
})

export default router
