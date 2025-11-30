import express from 'express'
import { authenticate } from '../middleware/auth.js'
import {
  getAccounts,
  getAccount,
  createAccountController,
  updateAccountController,
  closeAccountController,
  getAccountBalanceController,
  getAllAccountsController
} from '../controllers/accountController.js'

const router = express.Router()

// All routes require authentication
router.use(authenticate)

// User routes
router.get('/', getAccounts)
router.get('/:id', getAccount)
router.post('/', createAccountController)
router.put('/:id', updateAccountController)
router.delete('/:id', closeAccountController)
router.get('/:id/balance', getAccountBalanceController)

// Admin routes (require admin role - would be checked in controller or additional middleware)
router.get('/admin/all', getAllAccountsController)

export default router
