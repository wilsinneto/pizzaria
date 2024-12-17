import "express-async-errors";

import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";

import { router } from "./routes";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // No máximo 50mb
  })
);
app.use(router);

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

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
