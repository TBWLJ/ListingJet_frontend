export function money(value?: number, currency = "NGN") {
  if (!value) return "Contact for price";
  return new Intl.NumberFormat("en-NG", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}

export function percent(value?: number) {
  return `${Number(value || 0).toFixed(1)}%`;
}
