import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { UserRepository } from "../../user/repositories/user.repository";

export class ListCandidateUseCase {
  readonly #repository: UserRepository;
  readonly #cacheRepository: CacheRepository;

  constructor(
    repository: UserRepository, 
    cacheRepository: CacheRepository,
  ) {
    this.#repository = repository;
    this.#cacheRepository = cacheRepository;
  }

  public async execute() {
    const result = await this.#repository.find('C');

    return result.map(item => {
      return item.toJson();
    });
  }
}
