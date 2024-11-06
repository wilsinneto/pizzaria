import express, { Express, NextFunction, Request, Response } from "express";
import "express-async-errors";

import { router } from "./routes";

const app: Express = express();

app.use(express.json());
app.use(router);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
      response.status(400).json({
        error: error.message,
      });
    }

    response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

app.listen(3333, () => console.log("Servidor online"));
