import { Request, Response, Router } from "express";
import { checkLoginMiddleware } from "../../login/middleware/check-login.middleware";
import { RecruiterController } from "../controllers/recruiter.controller";
import { checkLoginRecruiterMiddleware } from "../middleware/check-login-recruiter";
import { checkDuplicateRecruiterValidator } from "../validators/check-duplicate-recruiter.validator";
import { createRecruiterValidator } from "../validators/create-recruiter.validator";

export const recruiterRoutes = () => {
    const router = Router();

    router.post(
        "/",
        [createRecruiterValidator, checkDuplicateRecruiterValidator],
        new RecruiterController().create
    );

    router.post(
        "/vaga",
        [checkLoginMiddleware, checkLoginRecruiterMiddleware],
        (req: Request, res: Response) => {
            return res.send({
                ok: true,
                message: "Job created.",
            });
        }
    );

    router.get(
        "/",
        new RecruiterController().list
    );

    return router;
};
