import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const AccountLimits = sequelize.define('AccountLimits', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  account_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    references: {
      model: 'accounts',
      key: 'id'
    }
  },
  daily_limit: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 10000.00
  },
  monthly_limit: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 50000.00
  },
  transaction_limit: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 5000.00
  }
}, {
  tableName: 'account_limits',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

export default AccountLimits
