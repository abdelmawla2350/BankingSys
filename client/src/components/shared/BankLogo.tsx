import { Wallet } from "lucide-react";

export function BankLogo({ size = "default" }: { size?: "default" | "large" }) {
  const iconSize = size === "large" ? "h-12 w-12" : "h-8 w-8";
  const textSize = size === "large" ? "text-3xl" : "text-xl";

  return (
    <div className="flex items-center gap-3">
      <div className="gradient-primary rounded-2xl p-2 shadow-lg">
        <Wallet className={`${iconSize} text-white`} />
      </div>
      <span className={`${textSize} font-semibold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent`}>
        NU SMART BANK
      </span>
    </div>
  );
}
