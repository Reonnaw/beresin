import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonStyles } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { requireUser } from "@/features/auth/services/auth-service";
import { ClearCart } from "@/features/checkout/components/clear-cart";
import { getOrder } from "@/features/checkout/services/order-service";
import { formatDateTime, formatRupiah, formatShortId } from "@/lib/format";
import { firstParam } from "@/lib/search-params";

export async function OrderConfirmation({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const orderId = firstParam((await searchParams).order);
  await requireUser(`/checkout/success?order=${orderId ?? ""}`);
  const order = orderId ? await getOrder(orderId) : null;
  if (!order) notFound();

  return (
    <Card className="flex flex-col gap-5 p-6">
      <ClearCart />
      <div className="flex flex-col gap-1">
        <Eyebrow tone="success">Pesanan dibuat</Eyebrow>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Terima kasih!</h1>
        <p className="text-sm text-muted">
          No. pesanan <span className="font-mono text-foreground">{formatShortId(order.id)}</span>{" "}
          · {formatDateTime(order.created_at)}
        </p>
      </div>
      <ul className="flex flex-col divide-y divide-border border-y border-border text-sm">
        {order.order_items.map((item) => (
          <li key={item.id} className="flex justify-between gap-3 py-2">
            <span>
              {item.spare_parts.name}{" "}
              <span className="font-mono text-muted">
                {item.spare_parts.sku} ×{item.quantity}
              </span>
            </span>
            <span className="font-mono">{formatRupiah(item.unit_price * item.quantity)}</span>
          </li>
        ))}
      </ul>
      <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
        <dt className="text-muted">Total</dt>
        <dd className="font-mono font-semibold tabular-nums">{formatRupiah(order.total_amount)}</dd>
        <dt className="text-muted">Dikirim ke</dt>
        <dd className="whitespace-pre-line">{order.shipping_address}</dd>
      </dl>
      <Link href="/spare-parts" className={buttonStyles({ variant: "secondary", className: "self-start" })}>
        Kembali ke katalog
      </Link>
    </Card>
  );
}
