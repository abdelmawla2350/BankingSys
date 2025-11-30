import { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
import { Search, MoreVertical, AlertTriangle, Shield, Eye } from "lucide-react";

export function SuspiciousActivities() {
  const [searchQuery, setSearchQuery] = useState("");

  const suspiciousActivities = [
    {
      id: 1,
      user: "John Smith",
      email: "john.smith@email.com",
      activity: "Multiple failed login attempts",
      severity: "high",
      timestamp: "2024-01-15 14:30:00",
      ipAddress: "192.168.1.100",
      location: "New York, US",
      status: "unresolved",
    },
    {
      id: 2,
      user: "Sarah Johnson",
      email: "sarah.j@email.com",
      activity: "Large transfer to unknown account",
      severity: "medium",
      timestamp: "2024-01-15 12:15:00",
      ipAddress: "192.168.1.101",
      location: "Los Angeles, US",
      status: "investigating",
    },
    {
      id: 3,
      user: "Mike Wilson",
      email: "mike.w@email.com",
      activity: "Unusual login from new device",
      severity: "low",
      timestamp: "2024-01-15 09:45:00",
      ipAddress: "192.168.1.102",
      location: "Chicago, US",
      status: "resolved",
    },
    {
      id: 4,
      user: "Emma Davis",
      email: "emma.davis@email.com",
      activity: "Rapid succession of transfers",
      severity: "high",
      timestamp: "2024-01-14 16:20:00",
      ipAddress: "192.168.1.103",
      location: "Miami, US",
      status: "unresolved",
    },
    {
      id: 5,
      user: "Robert Brown",
      email: "r.brown@email.com",
      activity: "Login from suspicious IP",
      severity: "medium",
      timestamp: "2024-01-14 11:10:00",
      ipAddress: "192.168.1.104",
      location: "Boston, US",
      status: "investigating",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500/10 text-red-600 hover:bg-red-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20";
      case "low":
        return "bg-green-500/10 text-green-600 hover:bg-green-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unresolved":
        return "bg-red-500/10 text-red-600 hover:bg-red-500/20";
      case "investigating":
        return "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20";
      case "resolved":
        return "bg-green-500/10 text-green-600 hover:bg-green-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Suspicious Activities</h1>
          <p className="text-muted-foreground">Monitor and investigate security threats</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Shield className="h-4 w-4" />
          Security Settings
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <p className="text-2xl font-bold text-red-600">12</p>
              <p className="text-sm text-muted-foreground">High Risk</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold text-yellow-600">8</p>
              <p className="text-sm text-muted-foreground">Medium Risk</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold text-green-600">5</p>
              <p className="text-sm text-muted-foreground">Low Risk</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-blue-600">15</p>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by user, activity, or IP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-input-background"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Filter by Severity
          </Button>
        </div>
      </Card>

      {/* Activities Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suspiciousActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.email}</p>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="truncate" title={activity.activity}>
                    {activity.activity}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge className={getSeverityColor(activity.severity)}>
                    {activity.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(activity.timestamp).toLocaleString()}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {activity.location}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Shield className="h-4 w-4" />
                        Mark as Resolved
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-[var(--destructive)]">
                        <AlertTriangle className="h-4 w-4" />
                        Flag as Critical
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
