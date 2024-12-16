"use client"

import { createContext, ReactNode, useState } from "react";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/CookieClient";

interface OrderItemProps {
  id: string;
  amount: number;
  created_at: Date;
  order_id: string;
  product_id: string;
  order: {
    id: string;
    table: number;
    status: boolean;
    draft: boolean;
    name: string | null;
  },
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
  }
}

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderItemProps[];
}

type OrderProviderProps = {
  children: ReactNode
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderItemProps[]>([])

  async function onRequestOpen(order_id: string) {
    const token = await getCookieClient()

    const response = await api.get("/order/detail", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        order_id
      }
    })

    setOrder(response.data)
    setIsOpen(true);
  }

  function onRequestClose() {
    setIsOpen(false);
  }

  return(
    <OrderContext.Provider
      value={{
        isOpen,
        onRequestOpen,
        onRequestClose,
        order
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}