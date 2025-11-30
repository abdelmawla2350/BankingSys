import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const usersFilePath = path.join(__dirname, '../../data/users.json')

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

const writeUsersToFile = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error writing users file:', error)
    throw error
  }
}

export const getAllUsers = async (filters = {}) => {
  try {
    const users = readUsersFromFile()
    let filteredUsers = users

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredUsers = filteredUsers.filter(user =>
        user.first_name?.toLowerCase().includes(searchTerm) ||
        user.last_name?.toLowerCase().includes(searchTerm) ||
        user.email?.toLowerCase().includes(searchTerm) ||
        user.username?.toLowerCase().includes(searchTerm)
      )
    }

    if (filters.status) {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status)
    }

    if (filters.role) {
      filteredUsers = filteredUsers.filter(user => user.role === filters.role)
    }

    // Pagination
    const page = filters.page || 1
    const limit = filters.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return {
      success: true,
      data: {
        users: paginatedUsers,
        total: filteredUsers.length,
        page,
        limit,
        totalPages: Math.ceil(filteredUsers.length / limit)
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve users'
    }
  }
}

export const getUserById = async (id) => {
  try {
    const users = readUsersFromFile()
    const user = users.find(u => u.id === id)

    if (!user) {
      return {
        success: false,
        message: 'User not found'
      }
    }

    return {
      success: true,
      data: user
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve user'
    }
  }
}

export const updateUser = async (id, updateData) => {
  try {
    const users = readUsersFromFile()
    const userIndex = users.findIndex(u => u.id === id)

    if (userIndex === -1) {
      return {
        success: false,
        message: 'User not found'
      }
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updated_at: new Date().toISOString()
    }

    writeUsersToFile(users)

    return {
      success: true,
      data: users[userIndex],
      message: 'User updated successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update user'
    }
  }
}

export const deleteUser = async (id) => {
  try {
    const users = readUsersFromFile()
    const userIndex = users.findIndex(u => u.id === id)

    if (userIndex === -1) {
      return {
        success: false,
        message: 'User not found'
      }
    }

    users.splice(userIndex, 1)
    writeUsersToFile(users)

    return {
      success: true,
      message: 'User deleted successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to delete user'
    }
  }
}

export const getUserProfile = async (id) => {
  try {
    const users = readUsersFromFile()
    const user = users.find(u => u.id === id)

    if (!user) {
      return {
        success: false,
        message: 'User not found'
      }
    }

    // Return profile data (excluding password)
    const { password, ...profile } = user

    return {
      success: true,
      data: profile
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve user profile'
    }
  }
}

export const updateUserProfile = async (id, profileData) => {
  try {
    const users = readUsersFromFile()
    const userIndex = users.findIndex(u => u.id === id)

    if (userIndex === -1) {
      return {
        success: false,
        message: 'User not found'
      }
    }

    users[userIndex] = {
      ...users[userIndex],
      ...profileData,
      updated_at: new Date().toISOString()
    }

    writeUsersToFile(users)

    return {
      success: true,
      data: users[userIndex],
      message: 'Profile updated successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update user profile'
    }
  }
}
