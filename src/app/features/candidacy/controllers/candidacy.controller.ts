import { Request, Response } from "express";
import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { serverError, success } from "../../../shared/util/response.helper";
import { CandidacyRepository } from "../repositories/candidacy.repository";
import { ListCandidaciesUseCase } from "../usecases/list-candidacies.usecase";

export class CandidaciesController {
  public async list(req: Request, res: Response) {
    try {

      const usecase = new ListCandidaciesUseCase(
        new CandidacyRepository(),
        new CacheRepository()
      )      
      const result = await usecase.execute();

      return success(res, result, 'Listing all candidates.')
      
    } catch (error: any) {
      
      return serverError(res, error)

    }
  }
}
