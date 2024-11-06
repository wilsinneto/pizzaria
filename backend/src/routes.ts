import { Request, Response, Router } from "express";

const router = Router();

router.get("/teste", (request: Request, response: Response) => {
  response.status(200).json({ nome: "Sujeito Pizza" });
});

export { router };
