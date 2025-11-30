import express from 'express'
import {
  getUsers,
  getUser,
  updateUserController,
  deleteUserController,
  getUserProfileController,
  updateUserProfileController
} from '../controllers/userController.js'

const router = express.Router()

// Get all users (Admin only)
router.get('/', getUsers)

// Get user by ID
router.get('/:id', getUser)

// Update user
router.put('/:id', updateUserController)

// Delete user
router.delete('/:id', deleteUserController)

// Get user profile
router.get('/:id/profile', getUserProfileController)

// Update user profile
router.put('/:id/profile', updateUserProfileController)

export default router
