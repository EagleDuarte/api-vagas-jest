import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { CandidacyRepository } from "../repositories/candidacy.repository";

export class ListCandidaciesUseCase {
  constructor(
    private repository: CandidacyRepository,
    private cacheRepository: CacheRepository
    ) {}

  public async execute() {
    const cachedList = await this.cacheRepository.get('candidatura');
    if(cachedList) {
      return cachedList;
    }

    const result = await this.repository.list();
    const resultJson = result.map(item => item.toJson());

    await this.cacheRepository.set('candidatura', resultJson);

    return resultJson;
  }
}
