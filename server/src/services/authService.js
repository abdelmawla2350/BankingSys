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

export const authenticateUser = async (username, password) => {
  try {
    const users = readUsersFromFile()
    const user = users.find(u => u.username === username && u.password === password)

    if (!user) {
      return {
        success: false,
        message: 'Invalid username or password'
      }
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return {
      success: true,
      data: userWithoutPassword
    }
  } catch (error) {
    return {
      success: false,
      message: 'Authentication failed'
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

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user

    return {
      success: true,
      data: userWithoutPassword
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve user'
    }
  }
}

export const validateToken = async (token) => {
  // For file-based storage, token validation is simplified
  // In a real app, this would verify JWT tokens
  return {
    success: true,
    data: { userId: 'user_123', role: 'admin' } // Mock validation
  }
}

export const logoutUser = async (userId) => {
  // For file-based storage, logout is just a success response
  // In a real app with sessions/tokens, this would invalidate the session
  return {
    success: true,
    message: 'Logged out successfully'
  }
}
