import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController {
  async handle(req: Request, res: Response) {
    const order_id = req.query.order_id as string;

    const sendOrderService = new SendOrderService();

    const order = await sendOrderService.execute({
      order_id,
    });

    res.json(order);
  }
}

export { SendOrderController };
