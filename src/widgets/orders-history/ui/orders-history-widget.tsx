"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useOrders } from "@/entities/order/model/use-orders";
import type { CargoType, Order } from "@/entities/order/model/types";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal";

const cargoTypeLabel: Record<CargoType, string> = {
  documents: "Документы",
  fragile: "Хрупкое",
  regular: "Обычное",
};

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const statusLabel: Record<Order["status"], string> = {
  created: "Создана",
  in_progress: "В пути",
  delivered: "Доставлена",
};

export const OrdersHistoryWidget = () => {
  const { orders, removeOrder } = useOrders();
  const [search, setSearch] = useState("");
  const [cargoFilter, setCargoFilter] = useState<"all" | CargoType>("all");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const filteredOrders = useMemo(
    () =>
      orders.filter((order) => {
        const matchesSearch =
          search.trim().length === 0
            ? true
            : order.recipientName
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              order.recipientCity
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCargo =
          cargoFilter === "all" ? true : order.cargoType === cargoFilter;

        return matchesSearch && matchesCargo;
      }),
    [orders, search, cargoFilter]
  );

  const selectedOrder = filteredOrders.find(
    (order) => order.id === pendingDeleteId
  );

  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      removeOrder(pendingDeleteId);
    }
    setPendingDeleteId(null);
  };

  return (
    <>
      <Card className="space-y-4">
        <div className="grid gap-3 md:grid-cols-[2fr,1fr] md:items-end">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Поиск по имени получателя и городу назначения
            </label>
            <div className="mt-1">
              <Input
                placeholder="Например: Анна, Казань"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Тип груза
            </label>
            <div className="mt-1">
              <Select
                value={cargoFilter}
                onChange={(e) =>
                  setCargoFilter(e.target.value as "all" | CargoType)
                }
              >
                <option value="all">Все типы</option>
                <option value="documents">Документы</option>
                <option value="fragile">Хрупкое</option>
                <option value="regular">Обычное</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="pt-2">
          {filteredOrders.length === 0 ? (
            <p className="text-sm text-slate-600">
              Заявок пока нет. Оформите первую на странице{" "}
              <Link href="/create-order" className="text-blue-600 underline">
                создания заявки
              </Link>
              .
            </p>
          ) : (
            <ul className="space-y-3">
              {filteredOrders.map((order) => (
                <li key={order.id}>
                  <Card className="flex flex-col gap-3 border-slate-200 hover:border-blue-200 hover:shadow-md md:flex-row md:items-center">
                    <Link
                      href={`/orders-history/${order.id}`}
                      className="flex flex-1 flex-col gap-1 text-sm text-slate-800"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">
                          {order.senderCity} → {order.recipientCity}
                        </span>
                        <Badge variant="blue">{cargoTypeLabel[order.cargoType]}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span>Отправитель: {order.senderName}</span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span>{formatDateTime(order.createdAt)}</span>
                      </div>
                    </Link>

                    <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-2 text-xs text-slate-600 md:flex-col md:border-t-0 md:border-l md:pl-3 md:pt-0">
                      <div className="flex items-center gap-2">
                        <Badge variant="green">
                          {statusLabel[order.status]}
                        </Badge>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => setPendingDeleteId(order.id)}
                      >
                        Удалить
                      </Button>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>

      <Modal
        open={Boolean(pendingDeleteId)}
        title="Удалить заявку?"
        description="Это действие необратимо. Заявка будет удалена из истории."
        confirmLabel="Удалить"
        confirmVariant="danger"
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={handleConfirmDelete}
      >
        {selectedOrder && (
          <p>
            Заявка из <strong>{selectedOrder.senderCity}</strong> в{" "}
            <strong>{selectedOrder.recipientCity}</strong> от{" "}
            <strong>{selectedOrder.senderName}</strong>.
          </p>
        )}
      </Modal>
    </>
  );
};

