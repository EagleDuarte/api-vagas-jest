import { RecruiterModel } from "../../../models/recruiter.model";
import { UserRepository } from "../../user/repositories/user.repository";

interface CreateRecruiterDTO {
    nome: string;
    userName: string;
    senha: string;
    empresa: string;
}

export class CreateRecruiterUseCase {
    public async execute(data: CreateRecruiterDTO) {
        const recrutador = new RecruiterModel(
            data.nome,
            data.userName,
            data.senha,
            data.empresa
        );

        const repository = new UserRepository();
        const result = await repository.create(recrutador);

        return result.toJson();
    }
}
