import { Router } from "express";
import { LoginController } from "../controllers/login.controller";
import { loginValidator } from "../validators/login.validator";

export const loginRoutes = () => {
    const router = Router();

    router.post("/", [loginValidator], new LoginController().login);

    return router;
};
