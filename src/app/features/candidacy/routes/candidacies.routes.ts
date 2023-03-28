import { Router } from "express";
import { CandidaciesController } from "../controllers/candidacy.controller";

export const candidaciesRoutes = () => {

  const router = Router();

  router.get('/', new CandidaciesController().list);

  return router;

}
