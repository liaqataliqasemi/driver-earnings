export const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatDate(date: string) {
  return new Date(date + "T00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}