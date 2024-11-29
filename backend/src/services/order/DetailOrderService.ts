import prismaClient from "../../prisma";

type OrderRequest = {
  order_id: string;
};

class DetailOrderService {
  async execute({ order_id }: OrderRequest) {
    const order = await prismaClient.item.findMany({
      where: {
        order_id,
      },
      include: {
        order: true,
        product: true,
      },
    });

    return order;
  }
}

export { DetailOrderService };
