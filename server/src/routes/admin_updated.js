import express from 'express'
import { authenticate } from '../middleware/auth.js'
import {
  getDashboardDataController,
  getAllUsersForAdminController,
  updateUserByAdminController,
  deleteUserByAdminController,
  getAllTransactionsForAdminController,
  getSuspiciousActivitiesController,
  getSystemAnalyticsController
} from '../controllers/adminController.js'

const router = express.Router()

// All routes require authentication and admin role
router.use(authenticate)

// Dashboard
router.get('/dashboard', getDashboardDataController)

// User management
router.get('/users', getAllUsersForAdminController)
router.put('/users/:id', updateUserByAdminController)
router.delete('/users/:id', deleteUserByAdminController)

// Transaction management
router.get('/transactions', getAllTransactionsForAdminController)

// Security monitoring
router.get('/suspicious-activities', getSuspiciousActivitiesController)

// Analytics
router.get('/analytics', getSystemAnalyticsController)

export default router
