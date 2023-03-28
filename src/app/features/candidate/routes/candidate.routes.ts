import { Router } from "express";
import { CandidateController } from "../controllers/candidate.controller";
import { createCandidateValidator } from "../validators/create-candidate.validator";

export const candidateRoutes = () => {
  const router = Router();

  router.post("/", [createCandidateValidator],new CandidateController().create);

  router.get('/', new CandidateController().list);

  return router;
};
