import { ArrowUpRight, ArrowDownLeft, ShoppingBag, Coffee, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TransactionItemProps {
  title: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  category?: string;
}

const categoryIcons: Record<string, LucideIcon> = {
  shopping: ShoppingBag,
  coffee: Coffee,
  utilities: Zap,
  default: ArrowUpRight,
};

export function TransactionItem({ title, date, amount, type, category = "default" }: TransactionItemProps) {
  const isIncome = type === "income";
  const Icon = categoryIcons[category] || categoryIcons.default;
  const iconBg = isIncome ? "bg-[var(--success)]/10" : "bg-muted";
  const iconColor = isIncome ? "text-[var(--success)]" : "text-muted-foreground";
  const amountColor = isIncome ? "text-[var(--success)]" : "text-foreground";

  return (
    <div className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-xl transition-colors">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 ${iconBg} rounded-xl`}>
          {isIncome ? (
            <ArrowDownLeft className={`h-5 w-5 ${iconColor}`} />
          ) : (
            <Icon className={`h-5 w-5 ${iconColor}`} />
          )}
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
      </div>
      <p className={`font-semibold ${amountColor}`}>
        {isIncome ? "+" : "-"}${Math.abs(amount).toFixed(2)}
      </p>
    </div>
  );
}
