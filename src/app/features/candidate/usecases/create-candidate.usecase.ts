import { CandidateModel } from "../../../models/candidate.model";
import { UserModel } from "../../../models/user.model";
import { UserRepository } from "../../user/repositories/user.repository";

interface CreateCandidateDTO {
  nome: string;
  username: string;
  senha: string;
}

export class CreateCandidatoUseCase {
  public async execute(data: CreateCandidateDTO) {
    const candidato = new CandidateModel(
      data.nome,
      data.username,
      data.senha,
    )

    const repository = new UserRepository();
    const result = await repository.create(candidato);

    return result.toJson();
  }
}