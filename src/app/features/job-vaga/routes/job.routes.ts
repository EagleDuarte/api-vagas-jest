import { Router } from "express";
import { checkLoginCandidateMiddleware } from "../../candidate/middlewares/check-login-candidate";
import { checkLoginMiddleware } from "../../login/middleware/check-login.middleware";
import { checkLoginRecruiterMiddleware } from "../../recruiter/middleware/check-login-recruiter";
import { JobController } from "../controllers/job.controller";

export const jobRoutes = () => {
    const router = Router();

    router.post(
        "/",
        [checkLoginMiddleware, checkLoginRecruiterMiddleware],
        new JobController().create
    );

    router.post(
        "/apply/:idVaga",
        [checkLoginMiddleware, checkLoginCandidateMiddleware],
        new JobController().apply
    );

    return router;
};
