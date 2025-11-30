import React from 'react';
import { BankLogo } from "../shared/BankLogo";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LayoutDashboard, Receipt, Send, User, Bell, LogOut } from "lucide-react";

interface UserNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

const UserNav: React.FC<UserNavProps> = ({ activeScreen, onNavigate, onLogout }) => {
  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "transactions", icon: Receipt, label: "My Transactions" },
    { id: "transfer", icon: Send, label: "Transfer Funds" },
    { id: "profile", icon: User, label: "My Profile" },
  ];

  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center justify-between p-4 px-6">
        <BankLogo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                  isActive
                    ? "bg-primary/10 text-[var(--primary)]"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-secondary rounded-xl transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--destructive)] rounded-full" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 p-2 hover:bg-secondary rounded-xl transition-colors">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-[var(--primary)]">U</AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium">Regular User</p>
                  <p className="text-xs text-muted-foreground">user@nubank.com</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => onNavigate("profile")}>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[var(--destructive)]" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex overflow-x-auto p-2 gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-primary/10 text-[var(--primary)]"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default UserNav;
