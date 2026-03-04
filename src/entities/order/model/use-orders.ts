"use client";

import { useEffect, useState } from "react";
import type { Order } from "./types";

const STORAGE_KEY = "parcel-orders" as const;

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;

    const load = () => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as Order[];
        if (Array.isArray(parsed) && !cancelled) {
          setOrders(parsed);
        }
      } catch {}
    };

    const id = window.setTimeout(load, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, []);

  const persist = (next: Order[]) => {
    setOrders(next);
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addOrder = (order: Order) => {
    persist([order, ...orders]);
  };

  const removeOrder = (id: string) => {
    persist(orders.filter((o) => o.id !== id));
  };

  const getOrderById = (id: string) => {
    return orders.find((o) => o.id === id);
  };

  return {
    orders,
    addOrder,
    removeOrder,
    getOrderById,
  };
};
