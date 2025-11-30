import { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Search, Plus, MoreVertical, UserPlus, Filter } from "lucide-react";

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      balance: 24567.89,
      status: "active",
      joinDate: "Jan 15, 2024",
      transactions: 156,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      balance: 18234.50,
      status: "active",
      joinDate: "Feb 20, 2024",
      transactions: 203,
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.w@email.com",
      balance: 45123.00,
      status: "active",
      joinDate: "Jan 5, 2024",
      transactions: 287,
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@email.com",
      balance: 9876.34,
      status: "inactive",
      joinDate: "Mar 10, 2024",
      transactions: 45,
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "r.brown@email.com",
      balance: 32890.12,
      status: "active",
      joinDate: "Dec 28, 2023",
      transactions: 412,
    },
    {
      id: 6,
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      balance: 15678.90,
      status: "pending",
      joinDate: "Oct 15, 2024",
      transactions: 12,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage all user accounts and information</p>
        </div>
        <Button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Transactions</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-[var(--primary)]">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell className="font-semibold">
                  ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      user.status === "active"
                        ? "bg-[var(--success)]/10 text-[var(--success)] hover:bg-[var(--success)]/20"
                        : user.status === "pending"
                        ? "bg-[var(--warning)]/10 text-[var(--warning)] hover:bg-[var(--warning)]/20"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.transactions}</TableCell>
                <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuItem>View Transactions</DropdownMenuItem>
                      <DropdownMenuItem className="text-[var(--destructive)]">
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
