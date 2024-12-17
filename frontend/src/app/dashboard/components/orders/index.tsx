"use client"

import { use } from "react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { OrderProps } from "@/lib/order.type";
import { ModalOrder } from "@/app/dashboard/components/modal";
import { OrderContext } from "@/providers/order";
import styles from "./styles.module.scss";

interface Props {
  orders: OrderProps[]
}

export function Orders({ orders }: Props) {
  const { isOpen, onRequestOpen } = use(OrderContext)
  const router = useRouter()

  async function handleDetailOrder(orderId: string) {
    await onRequestOpen(orderId)
  }

  function handleRefresh() {
    router.refresh()
    toast.success("Pedidos atualizados com sucesso!")
  }

  return(
    <>
      <main className={styles.container}>
        <section className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>

          <button onClick={handleRefresh}>
            <RefreshCw size={24} color="#3fffa3" />
          </button>
        </section>

        <section className={styles.listOrders}>
          {!orders?.length && (
            <span className={styles.emptyItem}>
              Nenhum pedido aberto no momento...
            </span>
          )}

          {orders.map(order => (
            <button
              className={styles.orderItem}
              key={order.id}
              onClick={() => handleDetailOrder(order.id)}
            >
              <div className={styles.tag} />
              <span>Mesa {order.table}</span>
            </button>
          ))}
        </section>
      </main>

      { isOpen && <ModalOrder /> }
    </>
  )
}