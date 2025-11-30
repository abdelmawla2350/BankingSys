import { Card } from "../ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
}

export function StatCard({ title, value, change, icon: Icon, trend }: StatCardProps) {
  const trendColor = trend === "up" ? "text-[var(--success)]" : trend === "down" ? "text-[var(--destructive)]" : "text-muted-foreground";

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Icon className="h-6 w-6 text-[var(--primary)]" />
        </div>
        {change && (
          <span className={`text-sm font-medium ${trendColor}`}>{change}</span>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </Card>
  );
}
