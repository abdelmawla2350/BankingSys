import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const transactionsFilePath = path.join(__dirname, '../../data/transactions.json')

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

const writeTransactionsToFile = (transactions) => {
  try {
    fs.writeFileSync(transactionsFilePath, JSON.stringify(transactions, null, 2))
  } catch (error) {
    console.error('Error writing transactions file:', error)
    throw error
  }
}

export const getAllTransactions = async (filters = {}) => {
  try {
    const transactions = readTransactionsFromFile()
    let filteredTransactions = transactions

    if (filters.accountId) {
      filteredTransactions = filteredTransactions.filter(tx => tx.accountId === filters.accountId)
    }

    if (filters.type) {
      filteredTransactions = filteredTransactions.filter(tx => tx.type === filters.type)
    }

    if (filters.status) {
      filteredTransactions = filteredTransactions.filter(tx => tx.status === filters.status)
    }

    // Sort by timestamp descending
    filteredTransactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

    return {
      success: true,
      data: {
        transactions: filteredTransactions,
        total: filteredTransactions.length
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve transactions'
    }
  }
}

export const getTransactionById = async (id) => {
  try {
    const transactions = readTransactionsFromFile()
    const transaction = transactions.find(tx => tx.id === id)

    if (!transaction) {
      return {
        success: false,
        message: 'Transaction not found'
      }
    }

    return {
      success: true,
      data: transaction
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve transaction'
    }
  }
}

export const createTransaction = async (transactionData) => {
  try {
    const transactions = readTransactionsFromFile()
    const newTransaction = {
      id: `tx_${Date.now()}`,
      ...transactionData,
      timestamp: new Date().toISOString()
    }

    transactions.push(newTransaction)
    writeTransactionsToFile(transactions)

    return {
      success: true,
      data: newTransaction,
      message: 'Transaction created successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create transaction'
    }
  }
}

export const updateTransaction = async (id, updateData) => {
  try {
    const transactions = readTransactionsFromFile()
    const transactionIndex = transactions.findIndex(tx => tx.id === id)

    if (transactionIndex === -1) {
      return {
        success: false,
        message: 'Transaction not found'
      }
    }

    transactions[transactionIndex] = {
      ...transactions[transactionIndex],
      ...updateData
    }

    writeTransactionsToFile(transactions)

    return {
      success: true,
      data: transactions[transactionIndex],
      message: 'Transaction updated successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update transaction'
    }
  }
}

export const deleteTransaction = async (id) => {
  try {
    const transactions = readTransactionsFromFile()
    const transactionIndex = transactions.findIndex(tx => tx.id === id)

    if (transactionIndex === -1) {
      return {
        success: false,
        message: 'Transaction not found'
      }
    }

    transactions.splice(transactionIndex, 1)
    writeTransactionsToFile(transactions)

    return {
      success: true,
      message: 'Transaction deleted successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to delete transaction'
    }
  }
}
