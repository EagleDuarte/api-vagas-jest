import { RedisConnection } from "../../../main/database/redis.connection";

export class CacheRepository {
  private repository = RedisConnection.connection;

  public async get(chave: string) {
    const result = await this.repository.get(chave);
    if (!result) {
      return null;
    }

    return JSON.parse(result);
  }

  public async set(chave: string, data: any) {
    await this.repository.set(chave, JSON.stringify(data));
  }
}
