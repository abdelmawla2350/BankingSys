import { useState } from "react";
import { BankLogo } from "../shared/BankLogo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

interface WebLoginProps {
  onLogin?: (role: 'admin' | 'user') => void;
}

export function WebLogin({ onLogin }: WebLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Login successful:', data);
        onLogin?.(data.data.role);
      } else {
        console.log('Login failed:', data);
        setError(data.message || "Invalid username or password");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex gradient-primary flex-col justify-center items-center p-12 text-white">
        <div className="max-w-md">
          <BankLogo size="large" />
          <h1 className="text-4xl font-semibold mt-8 mb-4">
            Welcome to NU Bank 
          </h1>
          <p className="text-white/80 text-lg">
            Manage your banking operations with ease. Secure, fast, and reliable dashboard for all your banking needs.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div>
              <div className="text-3xl font-semibold mb-2">50K+</div>
              <div className="text-white/70 text-sm">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-semibold mb-2">$2.5B</div>
              <div className="text-white/70 text-sm">Transactions</div>
            </div>
            <div>
              <div className="text-3xl font-semibold mb-2">99.9%</div>
              <div className="text-white/70 text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <div className="lg:hidden mb-8">
            <BankLogo />
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-semibold mb-2">Login to Dashboard</h2>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="masteruser or user123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-input-background h-12"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input-background h-12"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Remember me for 30 days
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[var(--primary)] hover:bg-[var(--primary-dark)]"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button className="text-[var(--primary)] hover:underline">
              Contact Admin
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
