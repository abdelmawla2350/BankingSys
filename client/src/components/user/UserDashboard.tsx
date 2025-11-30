import React, { useState } from 'react';
import { StatCard } from "../shared/StatCard";
import { TransactionItem } from "../shared/TransactionItem";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Alert, AlertDescription } from "../ui/alert";
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownLeft, Send, Plus, Minus, CheckCircle, AlertTriangle } from "lucide-react";

const UserDashboard: React.FC = () => {
  const [balance, setBalance] = useState(12543.67);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferRecipient, setTransferRecipient] = useState('');
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isProcessing, setIsProcessing] = useState(false);

  const recentTransactions = [
    { id: 1, title: "Salary Deposit", date: "2 days ago", amount: 3500.00, type: "income" as const },
    { id: 2, title: "Grocery Shopping", date: "3 days ago", amount: 125.50, type: "expense" as const },
    { id: 3, title: "ATM Withdrawal", date: "5 days ago", amount: 200.00, type: "expense" as const },
    { id: 4, title: "Online Transfer", date: "1 week ago", amount: 500.00, type: "expense" as const },
  ];

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0) return;

    setIsProcessing(true);
    setTransactionStatus('idle');

    // Simulate API call
    setTimeout(() => {
      setBalance(prev => prev + amount);
      setIsProcessing(false);
      setTransactionStatus('success');
      setDepositAmount('');
      setIsDepositOpen(false);
      setTimeout(() => setTransactionStatus('idle'), 3000);
    }, 1500);
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0 || amount > balance) return;

    setIsProcessing(true);
    setTransactionStatus('idle');

    // Simulate API call
    setTimeout(() => {
      setBalance(prev => prev - amount);
      setIsProcessing(false);
      setTransactionStatus('success');
      setWithdrawAmount('');
      setIsWithdrawOpen(false);
      setTimeout(() => setTransactionStatus('idle'), 3000);
    }, 1500);
  };

  const handleTransfer = async () => {
    const amount = parseFloat(transferAmount);
    if (!amount || amount <= 0 || amount > balance || !transferRecipient.trim()) return;

    setIsProcessing(true);
    setTransactionStatus('idle');

    // Simulate API call
    setTimeout(() => {
      setBalance(prev => prev - amount);
      setIsProcessing(false);
      setTransactionStatus('success');
      setTransferAmount('');
      setTransferRecipient('');
      setIsTransferOpen(false);
      setTimeout(() => setTransactionStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">My Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your account overview.</p>
      </div>

      {/* Success/Error Messages */}
      {transactionStatus === 'success' && (
        <Alert className="border-green-500 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Transaction completed successfully!
          </AlertDescription>
        </Alert>
      )}

      {transactionStatus === 'error' && (
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            Transaction failed. Please try again.
          </AlertDescription>
        </Alert>
      )}

      {/* Account Balance */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
            <p className="text-4xl font-bold text-primary">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            <p className="text-sm text-muted-foreground mt-1">Account ending in ****1234</p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Deposit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Deposit Funds</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="depositAmount">Amount ($)</Label>
                    <Input
                      id="depositAmount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleDeposit}
                    disabled={isProcessing || !depositAmount || parseFloat(depositAmount) <= 0}
                    className="w-full"
                  >
                    {isProcessing ? 'Processing...' : 'Deposit Funds'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Minus className="h-4 w-4 mr-2" />
                  Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw Funds</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="withdrawAmount">Amount ($)</Label>
                    <Input
                      id="withdrawAmount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                  </div>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Available balance: ${balance.toFixed(2)}
                    </AlertDescription>
                  </Alert>
                  <Button
                    onClick={handleWithdraw}
                    disabled={isProcessing || !withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > balance}
                    className="w-full"
                  >
                    {isProcessing ? 'Processing...' : 'Withdraw Funds'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Send className="h-4 w-4 mr-2" />
                  Transfer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Transfer Funds</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="transferRecipient">Recipient Account</Label>
                    <Input
                      id="transferRecipient"
                      placeholder="Enter account number"
                      value={transferRecipient}
                      onChange={(e) => setTransferRecipient(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transferAmount">Amount ($)</Label>
                    <Input
                      id="transferAmount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                    />
                  </div>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Available balance: ${balance.toFixed(2)}
                    </AlertDescription>
                  </Alert>
                  <Button
                    onClick={handleTransfer}
                    disabled={isProcessing || !transferAmount || !transferRecipient.trim() || parseFloat(transferAmount) <= 0 || parseFloat(transferAmount) > balance}
                    className="w-full"
                  >
                    {isProcessing ? 'Processing...' : 'Transfer Funds'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Monthly Income"
          value="$3,500"
          change="+5.2%"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="Monthly Expenses"
          value="$2,125"
          change="-2.1%"
          icon={ArrowUpRight}
          trend="down"
        />
        <StatCard
          title="Available Balance"
          value={`$${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          change="+8.7%"
          icon={DollarSign}
          trend="up"
        />
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Plus className="h-6 w-6" />
                <span>Deposit</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Deposit Funds</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="depositAmountQuick">Amount ($)</Label>
                  <Input
                    id="depositAmountQuick"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleDeposit}
                  disabled={isProcessing || !depositAmount || parseFloat(depositAmount) <= 0}
                  className="w-full"
                >
                  {isProcessing ? 'Processing...' : 'Deposit Funds'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Minus className="h-6 w-6" />
                <span>Withdraw</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Withdraw Funds</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="withdrawAmountQuick">Amount ($)</Label>
                  <Input
                    id="withdrawAmountQuick"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Available balance: ${balance.toFixed(2)}
                  </AlertDescription>
                </Alert>
                <Button
                  onClick={handleWithdraw}
                  disabled={isProcessing || !withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > balance}
                  className="w-full"
                >
                  {isProcessing ? 'Processing...' : 'Withdraw Funds'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Send className="h-6 w-6" />
                <span>Transfer</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Transfer Funds</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="transferRecipientQuick">Recipient Account</Label>
                  <Input
                    id="transferRecipientQuick"
                    placeholder="Enter account number"
                    value={transferRecipient}
                    onChange={(e) => setTransferRecipient(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transferAmountQuick">Amount ($)</Label>
                  <Input
                    id="transferAmountQuick"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                </div>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Available balance: ${balance.toFixed(2)}
                  </AlertDescription>
                </Alert>
                <Button
                  onClick={handleTransfer}
                  disabled={isProcessing || !transferAmount || !transferRecipient.trim() || parseFloat(transferAmount) <= 0 || parseFloat(transferAmount) > balance}
                  className="w-full"
                >
                  {isProcessing ? 'Processing...' : 'Transfer Funds'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <DollarSign className="h-6 w-6" />
            <span>Balance</span>
          </Button>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="space-y-2">
          {recentTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} {...transaction} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserDashboard;
