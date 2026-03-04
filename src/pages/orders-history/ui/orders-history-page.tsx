import Link from "next/link";
import { OrdersHistoryWidget } from "@/widgets/orders-history";
import { Button } from "@/shared/ui/button";

export const OrdersHistoryPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              История заявок
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Просматривайте оформленные заявки, фильтруйте и управляйте ими.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/create-order" className="w-full md:w-auto">
              <Button fullWidth type="button">
                Новая заявка
              </Button>
            </Link>
          </div>
        </header>

        <OrdersHistoryWidget />
      </div>
    </main>
  );
};

export default OrdersHistoryPage;

