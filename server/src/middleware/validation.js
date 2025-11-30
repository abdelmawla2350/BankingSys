import { validationResult } from 'express-validator'

/**
 * Middleware to handle validation errors
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    })
  }

  next()
}

/**
 * Custom validation rules
 */
export const customValidators = {
  isValidAmount: (value) => {
    const num = parseFloat(value)
    return !isNaN(num) && num > 0 && num <= 999999999.99
  },

  isValidAccountNumber: (value) => {
    return /^\d{8,20}$/.test(value)
  },

  isValidRoutingNumber: (value) => {
    return /^\d{9}$/.test(value)
  },

  isValidTransactionType: (value) => {
    return ['DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'FEE'].includes(value)
  },

  isValidAccountStatus: (value) => {
    return ['ACTIVE', 'INACTIVE', 'FROZEN', 'CLOSED', 'PENDING_APPROVAL'].includes(value)
  },

  isValidUserStatus: (value) => {
    return ['ACTIVE', 'INACTIVE', 'SUSPENDED'].includes(value)
  },

  isValidRole: (value) => {
    return ['CUSTOMER', 'ADMIN'].includes(value)
  }
}
