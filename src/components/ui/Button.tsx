import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
};

export function Button({ className = "", variant = "primary", loading, children, ...props }: Props) {
  const styles = {
    primary: "bg-navy text-white hover:bg-ink",
    secondary: "bg-white text-navy border border-slate-200 hover:border-mint",
    ghost: "bg-transparent text-navy hover:bg-slate-100"
  };
  return (
    <button
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
