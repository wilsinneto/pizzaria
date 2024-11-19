import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListaCategoryController } from "./controllers/category/ListaCategoryController";
import { CreateProductController } from "./controllers/product/CreateProductController";

const router = Router();

router.post("/users", new CreateUserController().handle);
router.post("/session", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

router.post(
  "/category",
  isAuthenticated,
  new CreateCategoryController().handle
);
router.get("/category", isAuthenticated, new ListaCategoryController().handle);

router.post("/product", isAuthenticated, new CreateProductController().handle);

export { router };
