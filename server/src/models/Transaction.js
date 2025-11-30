import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  fee_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00,
    validate: {
      min: 0
    }
  },
  type: {
    type: DataTypes.ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'FEE'),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  from_account_id: {
    type: DataTypes.CHAR(36),
    allowNull: true,
    references: {
      model: 'accounts',
      key: 'id'
    }
  },
  to_account_id: {
    type: DataTypes.CHAR(36),
    allowNull: true,
    references: {
      model: 'accounts',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'),
    defaultValue: 'COMPLETED'
  },
  reference: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: true
  },
  account_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id'
    }
  },
  processed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  processed_by: {
    type: DataTypes.CHAR(36),
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'transactions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
})

export default Transaction
