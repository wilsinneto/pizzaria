"use client"

import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  finishOrder: (order_id: string) => Promise<void>;
}

type OrderProviderProps = {
  children: ReactNode
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderItemProps[]>([])
  const router = useRouter()

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

  async function finishOrder(order_id: string) {
    const token = await getCookieClient()

    try {
      await api.put("/order/finish", null, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          order_id
        }
      })
    } catch (error) {
      toast.error("Falha ao finalizar o pedido!")
      return
    }

    toast.success("Pedido finalizado com sucesso!")

    router.refresh()
    setIsOpen(false);
  }

  return(
    <OrderContext.Provider
      value={{
        isOpen,
        onRequestOpen,
        onRequestClose,
        finishOrder,
        order
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}