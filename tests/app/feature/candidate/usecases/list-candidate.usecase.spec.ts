import { ListCandidateUseCase } from '../../../../../src/app/features/candidate/usecases/list-candidate.usecase';
import { UserRepository } from '../../../../../src/app/features/user/repositories/user.repository';
import { UserModel } from '../../../../../src/app/models/user.model';
import { CacheRepository } from '../../../../../src/app/shared/repositories/cache.repository';
import { RedisConnection } from '../../../../../src/main/database/redis.connection';
import { DatabaseConnection } from '../../../../../src/main/database/typeorm.connection';

interface SutTypes {
  cacheRepository: CacheRepository;
  repository: UserRepository;
  sut: ListCandidateUseCase;
}

const makeSut = (): SutTypes => {
  const cacheRepository = new CacheRepository();
  const repository = new UserRepository();
  const sut = new ListCandidateUseCase(
    repository,
    cacheRepository,
  );

  return {sut, repository, cacheRepository}
}

describe('ListCandidateUseCase -', () => {
  beforeAll(async () => {
    await DatabaseConnection.connect();
    await RedisConnection.connect();
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await DatabaseConnection.connection.destroy();
    await RedisConnection.connection.quit();
  });

  test('Must call a find method from UserRepository with the right values.', async () => {
    const { sut, repository } = makeSut();

    jest.spyOn(repository, 'find').mockResolvedValue([]);
    const observer = jest.spyOn(repository, 'find');

    await sut.execute();

    expect(observer).toHaveBeenCalledTimes(1);
    expect(observer).toHaveBeenCalledWith('C');
  });

  test('Must return a list with userModel instances converted in JSON.', async () => {
    const userModel = new UserModel(
      'any_name',
      'any_username',
      'any_pass',
      'any_type',
    );
    const userModel2 = new UserModel(
      'any_name_2',
      'any_username_2',
      'any_pass_2',
      'any_type_2',
    );
    const expected = [
      userModel.toJson(),
      userModel2.toJson(),
    ];

    const { sut, repository } = makeSut();

    jest.spyOn(repository, 'find').mockResolvedValue([
      userModel,
      userModel2,
    ]);

    const result = await sut.execute();

    expect(result).toEqual(expected);
  });
});
