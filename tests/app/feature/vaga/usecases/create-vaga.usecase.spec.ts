import { UserRepository } from '../../../../../src/app/features/user/repositories/user.repository';
import { JobRepository } from '../../../../../src/app/features/job-vaga/repositories/job.repository';
import { CreateJobUseCase } from '../../../../../src/app/features/job-vaga/usecases/create-job.usecase';
import { UserModel } from '../../../../../src/app/models/user.model';
import { JobModel } from '../../../../../src/app/models/job.model';
import { DatabaseConnection } from '../../../../../src/main/database/typeorm.connection';

interface SutTypes {
  userRepository: UserRepository;
  jobRepository: JobRepository;
  sut: CreateJobUseCase;
}

const makeSut = (): SutTypes => {
  const userRepository = new UserRepository();
  const jobRepository = new JobRepository();
  const sut = new CreateJobUseCase(
    userRepository,
    jobRepository,
  );

  return { userRepository, jobRepository, sut };
}

describe('CreateJobUseCase - ', () => {
  const createJobDTO = {
    descricao: 'any_description',
    empresa: 'any_company',
    dtLimite: new Date(),
    indAtivo: true,
    idRecrutador: 'any_id',
  };

  beforeAll(async () => {
    await DatabaseConnection.connect();
  });

  afterEach(() => jest.clearAllMocks());

  afterAll(async () => {
    await DatabaseConnection.connection.destroy();
  });

  test('Must call a get method from userRepository with right values.', async () => {
    const { sut, userRepository } = makeSut();

    jest.spyOn(userRepository, 'get').mockResolvedValue(null);
    const observer = jest.spyOn(userRepository, 'get');

    await sut.execute(createJobDTO);

    expect(observer).toBeCalledTimes(1);
    expect(observer).toBeCalledWith(createJobDTO.idRecrutador);
  });

  test('Must call a create method from jobRepository with the right values.', async () => {
    const userModel = new UserModel("name", "username", "pass", "type");
    const jobModel = new JobModel(
      createJobDTO.descricao,
      createJobDTO.empresa,
      createJobDTO.dtLimite,
      createJobDTO.indAtivo,
      userModel,
    );

    const { sut, userRepository, jobRepository } = makeSut();

    jest.spyOn(userRepository, 'get').mockResolvedValue(userModel);
    jest.spyOn(jobRepository, 'create').mockResolvedValue(jobModel);
    const observer = jest.spyOn(jobRepository, 'create');

    await sut.execute(createJobDTO);

    expect(observer).toHaveBeenCalledTimes(1);
  });

  test('Shall return a null status when not finding any user id sent on DTO.', async () => {
    const { userRepository, sut } = makeSut();

    jest.spyOn(userRepository, 'get').mockResolvedValue(null);

    const result = await sut.execute(createJobDTO);

    expect(result).toEqual(null);
  });

  test('Shall return a instance of JobModel in JSON, when creating a new job.', async () => {
    const userModel = new UserModel("name", "username", "pass", "type");
    const jobModel = new JobModel(
      createJobDTO.descricao,
      createJobDTO.empresa,
      createJobDTO.dtLimite,
      createJobDTO.indAtivo,
      userModel,
    );
    const { sut, userRepository, jobRepository } = makeSut();

    jest.spyOn(userRepository, 'get').mockResolvedValue(userModel);
    jest.spyOn(jobRepository, 'create').mockResolvedValue(jobModel);

    const result = await sut.execute(createJobDTO);

    expect(result).toEqual(jobModel.toJson());
  });

  test('Must return the launch of a error, when the same were landed in the repository.', async () => {
    const { userRepository, sut } = makeSut();
    const error = new Error();

    jest.spyOn(userRepository, 'get').mockRejectedValue(new Error());

    const result = sut.execute(createJobDTO);

    await expect(result).rejects.toThrowError(new Error());
  });
});