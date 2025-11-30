// Admin Screens
import { useState } from "react";
import { WebLogin } from "./components/admin/WebLogin";
import { WebDashboard } from "./components/admin/WebDashboard";
import { UserManagement } from "./components/admin/UserManagement";
import { TransactionsPage } from "./components/admin/TransactionsPage";
import { AnalyticsDashboard } from "./components/admin/AnalyticsDashboard";
import { SettingsPage } from "./components/admin/SettingsPage";
import { SuspiciousActivities } from "./components/admin/SuspiciousActivities";
import { WebNav } from "./components/admin/WebNav";

// User Screens
import UserDashboard from "./components/user/UserDashboard";
import MyTransactions from "./components/user/MyTransactions";
import TransferFunds from "./components/user/TransferFunds";
import MyProfile from "./components/user/MyProfile";
import UserNav from "./components/user/UserNav";

//import { Card } from "./components/ui/card";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("login");
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(null);

  const handleLogin = (role: 'admin' | 'user') => {
    setUserRole(role);
    setCurrentScreen("dashboard");
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentScreen("login");
  };

  // Render Views based on role
  const renderView = () => {
    if (currentScreen === "login") {
      return <WebLogin onLogin={handleLogin} />;
    }

    if (userRole === "admin") {
      return (
        <div className="min-h-screen bg-background">
          <WebNav activeScreen={currentScreen} onNavigate={handleNavigate} onLogout={handleLogout} />
          {currentScreen === "dashboard" && <WebDashboard />}
          {currentScreen === "users" && <UserManagement />}
          {currentScreen === "transactions" && <TransactionsPage />}
          {currentScreen === "analytics" && <AnalyticsDashboard />}
          {currentScreen === "settings" && <SettingsPage />}
          {currentScreen === "suspicious" && <SuspiciousActivities />}
        </div>
      );
    }

    if (userRole === "user") {
      return (
        <div className="min-h-screen bg-background">
          <UserNav activeScreen={currentScreen} onNavigate={handleNavigate} onLogout={handleLogout} />
          {currentScreen === "dashboard" && <UserDashboard />}
          {currentScreen === "transactions" && <MyTransactions />}
          {currentScreen === "transfer" && <TransferFunds />}
          {currentScreen === "profile" && <MyProfile />}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen">
      {renderView()}

      {/* Branding Footer - Style Guide Reference */}

    </div>
  );
}
