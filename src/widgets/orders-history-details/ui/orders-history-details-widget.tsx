"use client";

import Link from "next/link";
import { useOrders } from "@/entities/order/model/use-orders";
import { Card } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";

interface Props {
  id: string;
}

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const OrdersHistoryDetailsWidget = ({ id }: Props) => {
  const { getOrderById } = useOrders();
  const order = getOrderById(id);

  if (!order) {
    return (
      <Card className="space-y-3">
        <p className="text-sm text-slate-700">
          Заявка не найдена. Возможно, она была удалена.
        </p>
        <Link
          href="/orders-history"
          className="text-sm text-blue-600 underline underline-offset-2"
        >
          Вернуться к истории заявок
        </Link>
      </Card>
    );
  }

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {order.senderCity} → {order.recipientCity}
          </p>
          <p className="mt-0.5 text-xs text-slate-600">
            Создана: {formatDateTime(order.createdAt)}
          </p>
        </div>
        <Badge variant="green">Статус: {order.status}</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1 text-sm">
          <h2 className="font-medium text-slate-800">Отправитель</h2>
          <p className="text-slate-700">
            <span className="font-medium">Имя:</span> {order.senderName}
            <br />
            <span className="font-medium">Телефон:</span> {order.senderPhone}
            <br />
            <span className="font-medium">Город:</span> {order.senderCity}
          </p>
        </div>

        <div className="space-y-1 text-sm">
          <h2 className="font-medium text-slate-800">
            Получатель и посылка
          </h2>
          <p className="text-slate-700">
            <span className="font-medium">Имя:</span> {order.recipientName}
            <br />
            <span className="font-medium">Город назначения:</span>{" "}
            {order.recipientCity}
            <br />
            <span className="font-medium">Тип груза:</span>{" "}
            {order.cargoType === "documents"
              ? "Документы"
              : order.cargoType === "fragile"
              ? "Хрупкое"
              : "Обычное"}
            <br />
            <span className="font-medium">Вес:</span> {order.weight} кг
          </p>
        </div>
      </div>
    </Card>
  );
};

