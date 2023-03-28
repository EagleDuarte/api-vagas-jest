import { JobModel } from "../../../models/job.model";
import { UserRepository } from "../../user/repositories/user.repository";
import { JobRepository } from "../repositories/job.repository";

interface CreateJobDTO {
  descricao: string;
  empresa: string;
  dtLimite: Date;
  indAtivo: boolean;
  maxCandidatos?: number;
  idRecrutador: string;
}

export class CreateJobUseCase {
  readonly #userRepository: UserRepository;
  readonly #jobRepository: JobRepository;

  constructor(
    userRepository: UserRepository,
    JobRepository: JobRepository,
  ) {
    this.#userRepository = userRepository;
    this.#jobRepository = JobRepository;
  }

  public async execute(data: CreateJobDTO) {
    const usuarioResult = await this.#userRepository.get(data.idRecrutador);

    if (!usuarioResult) {
      return null;
    }

    const vaga = new JobModel(
      data.descricao,
      data.empresa,
      data.dtLimite,
      data.indAtivo,
      usuarioResult,
      data.maxCandidatos
    );

    const result = await this.#jobRepository.create(vaga);

    return result.toJson();
  }
}
