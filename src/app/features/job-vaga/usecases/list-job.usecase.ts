import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { JobRepository } from "../repositories/job.repository";

export class ListingJobUseCase {
  constructor(
    private repository: JobRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute() {
    const cachedList = await this.cacheRepository.get('vagas');
    if(cachedList) {
      return cachedList;
    }

    const result = await this.repository.list();
    const resultJson = result.map(item => item.toJson());

    await this.cacheRepository.set('vagas', resultJson);

    return resultJson;
  }
}
