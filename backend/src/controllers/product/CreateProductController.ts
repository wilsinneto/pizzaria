import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;
    const file = req.file;

    const createProductService = new CreateProductService();

    if (!file) {
      throw new Error("error upload file");
    }

    const { filename } = file;

    const product = await createProductService.execute({
      category_id,
      name,
      price,
      description,
      banner: filename,
    });

    res.json(product);
  }
}

export { CreateProductController };
