import { CandidacyModel } from "../../../models/candidacy.model";
import { CandidacyRepository } from "../../candidacy/repositories/candidacy.repository";
import { UserRepository } from "../../user/repositories/user.repository";
import { JobRepository } from "../repositories/job.repository";

interface ApplyJobDTO {
    idCandidato: string;
    idVaga: string;
    indSucesso: boolean;
}

export class ApplyJobUseCase {
    public async execute(data: ApplyJobDTO) {
        const jobRepository = new JobRepository();
        const userRepository = new UserRepository();

        const candidato = await userRepository.get(data.idCandidato);
        if (!candidato) {
            return null;
        }

        const vaga = await jobRepository.find(data.idVaga);
        if (!vaga) {
            return null;
        }

        const candidacyRepository = new CandidacyRepository();

        const usuarioVaga = await candidacyRepository.get(
            data.idCandidato,
            data.idVaga
        );
        if (usuarioVaga) {
            throw new Error("This candidate is already aplied to this job.");
        }

        if (!vaga.indAtivo) {
            throw new Error("This job is not available.");
        }

        if (vaga.dtLimite < new Date()) {
            throw new Error(
                "This job is not accepting new candidacies."
            );
        }

        const candidatura = new CandidacyModel(
            candidato,
            vaga,
            data.indSucesso,
            new Date()
        );

        const result = await candidacyRepository.create(candidatura);

        return result.toJson();
    }
}
