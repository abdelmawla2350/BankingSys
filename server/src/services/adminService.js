import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const usersFilePath = path.join(__dirname, '../../data/users.json')
const accountsFilePath = path.join(__dirname, '../../data/accounts.json')
const transactionsFilePath = path.join(__dirname, '../../data/transactions.json')
const analyticsFilePath = path.join(__dirname, '../../data/analytics.json')

const readUsersFromFile = () => {
  try {
    if (!fs.existsSync(usersFilePath)) {
      return []
    }
    const data = fs.readFileSync(usersFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading users file:', error)
    return []
  }
}

const readAccountsFromFile = () => {
  try {
    if (!fs.existsSync(accountsFilePath)) {
      return []
    }
    const data = fs.readFileSync(accountsFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading accounts file:', error)
    return []
  }
}

const readTransactionsFromFile = () => {
  try {
    if (!fs.existsSync(transactionsFilePath)) {
      return []
    }
    const data = fs.readFileSync(transactionsFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading transactions file:', error)
    return []
  }
}

const readAnalyticsFromFile = () => {
  try {
    if (!fs.existsSync(analyticsFilePath)) {
      return {}
    }
    const data = fs.readFileSync(analyticsFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading analytics file:', error)
    return {}
  }
}

export const getDashboardStats = async () => {
  try {
    const analytics = readAnalyticsFromFile()

    if (Object.keys(analytics).length === 0) {
      // Calculate from actual data if analytics file is empty
      const users = readUsersFromFile()
      const accounts = readAccountsFromFile()
      const transactions = readTransactionsFromFile()

      const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)
      const todayTransactions = transactions.filter(tx =>
        new Date(tx.timestamp).toDateString() === new Date().toDateString()
      ).length

      return {
        success: true,
        data: {
          totalUsers: users.length,
          totalBalance,
          transactionsToday: todayTransactions,
          revenue: 67500, // Placeholder
          userGrowth: 12.5,
          balanceGrowth: 8.2,
          transactionGrowth: 23.1,
          revenueGrowth: -3.5
        }
      }
    }

    return {
      success: true,
      data: analytics.dashboard
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve dashboard stats'
    }
  }
}

export const getAnalyticsData = async () => {
  try {
    const analytics = readAnalyticsFromFile()

    if (Object.keys(analytics).length === 0) {
      return {
        success: true,
        data: {
          revenueData: [],
          transactionVolumeData: []
        }
      }
    }

    return {
      success: true,
      data: analytics.charts
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve analytics data'
    }
  }
}

export const getAllUsersAdmin = async () => {
  try {
    const users = readUsersFromFile()
    const accounts = readAccountsFromFile()

    // Combine user data with account balances
    const usersWithBalances = users.map(user => {
      const userAccounts = accounts.filter(acc => acc.userId === user.id)
      const totalBalance = userAccounts.reduce((sum, acc) => sum + acc.balance, 0)
      const transactionCount = userAccounts.reduce((sum, acc) => {
        const accountTransactions = readTransactionsFromFile().filter(tx => tx.accountId === acc.id)
        return sum + accountTransactions.length
      }, 0)

      return {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        balance: totalBalance,
        status: user.status,
        joinDate: new Date(user.created_at).toLocaleDateString(),
        transactions: transactionCount
      }
    })

    return {
      success: true,
      data: {
        users: usersWithBalances,
        total: usersWithBalances.length
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve admin users'
    }
  }
}

export const getAllTransactionsAdmin = async () => {
  try {
    const transactions = readTransactionsFromFile()
    const users = readUsersFromFile()

    // Combine transaction data with user info
    const transactionsWithUsers = transactions.map(tx => {
      const account = readAccountsFromFile().find(acc => acc.id === tx.accountId)
      const user = account ? users.find(u => u.id === account.userId) : null

      return {
        id: tx.id,
        user: user ? `${user.first_name} ${user.last_name}` : 'Unknown',
        type: tx.type,
        amount: tx.amount,
        status: tx.status,
        date: new Date(tx.timestamp).toLocaleString(),
        method: tx.type === 'deposit' ? 'Bank Transfer' : tx.type === 'withdrawal' ? 'ATM' : 'Internal'
      }
    })

    return {
      success: true,
      data: {
        transactions: transactionsWithUsers,
        total: transactionsWithUsers.length
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve admin transactions'
    }
  }
}
