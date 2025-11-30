import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Account = sequelize.define('Account', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  user_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  account_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  routing_number: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('CHECKING', 'SAVINGS'),
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0.00,
    validate: {
      min: 0
    }
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'USD'
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'FROZEN', 'CLOSED', 'PENDING_APPROVAL'),
    defaultValue: 'PENDING_APPROVAL'
  }
}, {
  tableName: 'accounts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

export default Account
