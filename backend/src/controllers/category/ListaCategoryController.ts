import { Request, Response } from "express";
import { ListaCategoryService } from "../../services/category/ListaCategoryService";

class ListaCategoryController {
  async handle(req: Request, res: Response) {
    const listaCategoryService = new ListaCategoryService();

    const category = await listaCategoryService.execute();

    res.json(category);
  }
}

export { ListaCategoryController };
