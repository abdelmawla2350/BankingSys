import React, { useState } from 'react';
import { TransactionItem } from "../shared/TransactionItem";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search, Filter, Download } from "lucide-react";

const MyTransactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const allTransactions = [
    { id: 1, title: "Salary Deposit", date: "2024-01-15", amount: 3500.00, type: "income" as const, category: "salary" },
    { id: 2, title: "Grocery Shopping", date: "2024-01-14", amount: 125.50, type: "expense" as const, category: "shopping" },
    { id: 3, title: "ATM Withdrawal", date: "2024-01-13", amount: 200.00, type: "expense" as const, category: "withdrawal" },
    { id: 4, title: "Online Transfer to John", date: "2024-01-12", amount: 500.00, type: "expense" as const, category: "transfer" },
    { id: 5, title: "Freelance Payment", date: "2024-01-11", amount: 800.00, type: "income" as const, category: "freelance" },
    { id: 6, title: "Electric Bill", date: "2024-01-10", amount: 85.30, type: "expense" as const, category: "utilities" },
    { id: 7, title: "Coffee Shop", date: "2024-01-09", amount: 12.50, type: "expense" as const, category: "coffee" },
    { id: 8, title: "Deposit - Cash", date: "2024-01-08", amount: 1000.00, type: "income" as const, category: "deposit" },
  ];

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || transaction.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">My Transactions</h1>
        <p className="text-muted-foreground">View and manage all your account transactions.</p>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="income">Income Only</SelectItem>
              <SelectItem value="expense">Expenses Only</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </Card>

      {/* Transactions List */}
      <Card className="p-6">
        <div className="space-y-2">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No transactions found matching your criteria.
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} {...transaction} />
            ))
          )}
        </div>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">Total Income</p>
          <p className="text-2xl font-semibold text-green-600">
            +${allTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
          </p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
          <p className="text-2xl font-semibold text-red-600">
            -${allTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
          </p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">Net Balance</p>
          <p className="text-2xl font-semibold text-primary">
            ${allTransactions.reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0).toFixed(2)}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default MyTransactions;
