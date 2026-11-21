import { Badge } from "@/components/ui/badge";

const LOW_STOCK = 5;

export function StockBadge({ stock }: { stock: number }) {
  if (stock <= 0) return <Badge tone="danger">Stok habis</Badge>;
  if (stock <= LOW_STOCK) return <Badge tone="accent">Sisa {stock}</Badge>;
  return <Badge tone="success">Tersedia</Badge>;
}
