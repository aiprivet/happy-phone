'use client'
import Link from "next/link";
import { OrdersHistoryDetailsWidget } from "@/widgets/orders-history-details";

interface Props {
  id: string;
}

export const OrderDetailsPage = ({ id }: Props) => {
  return (
    <main className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Детали заявки
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Полная информация по выбранной заявке.
            </p>
          </div>
          <Link
            href="/orders-history"
            className="text-sm text-blue-600 underline underline-offset-2"
          >
            ← Вернуться к истории заявок
          </Link>
        </header>
        <OrdersHistoryDetailsWidget id={id} />
      </div>
    </main>
  );
};

export default OrderDetailsPage;

