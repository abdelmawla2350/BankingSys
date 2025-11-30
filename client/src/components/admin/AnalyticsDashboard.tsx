import { Card } from "../ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";

export function AnalyticsDashboard() {
  const spendingData = [
    { category: "Shopping", value: 3245, color: "var(--chart-1)" },
    { category: "Food & Dining", value: 1890, color: "var(--chart-2)" },
    { category: "Transportation", value: 980, color: "var(--chart-3)" },
    { category: "Utilities", value: 1250, color: "var(--chart-4)" },
    { category: "Entertainment", value: 760, color: "var(--chart-5)" },
  ];

  const savingsData = [
    { month: "Jan", savings: 2400, goal: 3000 },
    { month: "Feb", savings: 2800, goal: 3000 },
    { month: "Mar", savings: 2200, goal: 3000 },
    { month: "Apr", savings: 3200, goal: 3000 },
    { month: "May", savings: 2900, goal: 3000 },
    { month: "Jun", savings: 3400, goal: 3000 },
  ];

  const userGrowthData = [
    { month: "Jan", users: 4234 },
    { month: "Feb", users: 4567 },
    { month: "Mar", users: 4892 },
    { month: "Apr", users: 5123 },
    { month: "May", users: 5389 },
    { month: "Jun", users: 5624 },
  ];

  const cashFlowData = [
    { week: "Week 1", inflow: 12500, outflow: 8900 },
    { week: "Week 2", inflow: 15200, outflow: 9800 },
    { week: "Week 3", inflow: 13800, outflow: 10200 },
    { week: "Week 4", inflow: 16500, outflow: 11500 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive insights into your banking operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[var(--success)]/10 rounded-xl">
              <TrendingUp className="h-6 w-6 text-[var(--success)]" />
            </div>
            <span className="text-sm font-medium text-[var(--success)]">+12.5%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
          <p className="text-2xl font-semibold">$245,680</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Users className="h-6 w-6 text-[var(--primary)]" />
            </div>
            <span className="text-sm font-medium text-[var(--success)]">+8.3%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Active Users</p>
          <p className="text-2xl font-semibold">5,624</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[var(--accent)]/10 rounded-xl">
              <DollarSign className="h-6 w-6 text-[var(--accent)]" />
            </div>
            <span className="text-sm font-medium text-[var(--success)]">+15.2%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Avg. Balance</p>
          <p className="text-2xl font-semibold">$43,670</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[var(--warning)]/10 rounded-xl">
              <TrendingDown className="h-6 w-6 text-[var(--warning)]" />
            </div>
            <span className="text-sm font-medium text-[var(--destructive)]">-2.4%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Churn Rate</p>
          <p className="text-2xl font-semibold">3.2%</p>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Categories */}
        <Card className="p-6">
          <h3 className="mb-6">Spending by Category</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {spendingData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-muted-foreground">{item.category}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Savings Progress */}
        <Card className="p-6">
          <h3 className="mb-6">Savings vs Goals</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="savings" fill="var(--accent)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="goal" fill="var(--muted)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* User Growth */}
        <Card className="p-6">
          <h3 className="mb-6">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowthData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              />
              <Area type="monotone" dataKey="users" stroke="var(--primary)" fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Cash Flow */}
        <Card className="p-6">
          <h3 className="mb-6">Weekly Cash Flow</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="inflow" stroke="var(--success)" strokeWidth={2} />
              <Line type="monotone" dataKey="outflow" stroke="var(--destructive)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
