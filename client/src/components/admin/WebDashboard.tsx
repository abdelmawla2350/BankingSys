import { useState, useEffect } from "react";
import { StatCard } from "../shared/StatCard";
import { TransactionItem } from "../shared/TransactionItem";
import { Card } from "../ui/card";
import { Users, DollarSign, TrendingUp, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export function WebDashboard() {
  const [dashboardData, setDashboardData] = useState({
    revenueData: [] as any[],
    transactionVolumeData: [] as any[],
    recentTransactions: [] as any[],
    stats: {
      totalUsers: 0,
      totalBalance: 0,
      transactionsToday: 0,
      revenue: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/dashboard');
      const data = await response.json();

      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const { revenueData, transactionVolumeData, recentTransactions, stats } = dashboardData;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change="+12.5%"
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Total Balance"
          value={`$${stats.totalBalance.toLocaleString()}`}
          change="+8.2%"
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Transactions Today"
          value={stats.transactionsToday.toLocaleString()}
          change="+23.1%"
          icon={Activity}
          trend="up"
        />
        <StatCard
          title="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          change="-3.5%"
          icon={TrendingUp}
          trend="down"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="mb-1">Revenue vs Expenses</h3>
            <p className="text-sm text-muted-foreground">Monthly comparison for the last 6 months</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
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
              <Area type="monotone" dataKey="revenue" stroke="var(--primary)" fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="expenses" stroke="var(--accent)" fill="url(#colorExpenses)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Transaction Volume */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="mb-1">Transaction Volume</h3>
            <p className="text-sm text-muted-foreground">Daily transactions for the past week</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" />
              <YAxis stroke="var(--muted-foreground)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  border: '1px solid var(--border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="transactions" fill="var(--primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Transactions & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3>Recent Transactions</h3>
            <button className="text-sm text-[var(--primary)] hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            {recentTransactions.map((transaction: any) => (
              <TransactionItem key={transaction.id} {...transaction} />
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Total Inflow</span>
              <ArrowDownRight className="h-4 w-4 text-[var(--success)]" />
            </div>
            <p className="text-2xl font-semibold mb-1">$24,567</p>
            <p className="text-sm text-[var(--success)]">+18% from last month</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Total Outflow</span>
              <ArrowUpRight className="h-4 w-4 text-[var(--destructive)]" />
            </div>
            <p className="text-2xl font-semibold mb-1">$18,234</p>
            <p className="text-sm text-[var(--destructive)]">+12% from last month</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground">Net Balance</span>
              <TrendingUp className="h-4 w-4 text-[var(--primary)]" />
            </div>
            <p className="text-2xl font-semibold mb-1">$6,333</p>
            <p className="text-sm text-[var(--primary)]">+24% from last month</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
