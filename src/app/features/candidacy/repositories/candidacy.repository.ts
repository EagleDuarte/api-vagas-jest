import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { CandidacyModel } from "../../../models/candidacy.model";
import { UserModel } from "../../../models/user.model";
import { JobModel } from "../../../models/job.model";
import { CandidacyEntity } from "../../../shared/entities/candidacy.entity";

export class CandidacyRepository {
    private repository =
        DatabaseConnection.connection.getRepository(CandidacyEntity);

    public async create(candidatura: CandidacyModel) {
        const candidacyEntity = this.repository.create({
            idCandidato: candidatura.candidato.id,
            idVaga: candidatura.vaga.id,
            indSucesso: candidatura.indSucesso,
            dtCandidatura: candidatura.dtCandidatura,
        });

        await this.repository.save(candidacyEntity);

        const result = await this.repository.findOneBy({
            idCandidato: candidatura.candidato.id,
            idVaga: candidatura.vaga.id,
        });

        return this.mapEntityToModel(result!);
    }

    public async list() {
        const result = await this.repository.find();

        const candidatos = result.map(item => {
            return this.mapEntityToModel(item)
        })

        return candidatos;
    }

    public async get(idCandidato: string, idVaga: string) {
        const result = await this.repository.findOneBy({
            idCandidato,
            idVaga,
        });

        if (!result) {
            return null;
        }

        return this.mapEntityToModel(result);
    }

    private mapEntityToModel(entity: CandidacyEntity) {
        const candidato = UserModel.create(
            entity.candidato.id,
            entity.candidato.nome,
            entity.candidato.username,
            entity.candidato.tipo,
            entity.candidato.senha,
            entity.candidato.empresa
        );

        const recrutadorVaga = UserModel.create(
            entity.vaga.recrutador.id,
            entity.vaga.recrutador.nome,
            entity.vaga.recrutador.username,
            entity.vaga.recrutador.tipo,
            entity.vaga.recrutador.senha,
            entity.vaga.recrutador.empresa
        );

        const vaga = JobModel.create(
            entity.vaga.id,
            entity.vaga.descricao,
            entity.vaga.recrutador.empresa,
            entity.vaga.dtLimite,
            entity.vaga.indAtivo,
            recrutadorVaga,
            entity.vaga.maxCandidatos
        );

        return new CandidacyModel(
            candidato,
            vaga,
            entity.indSucesso,
            entity.dtCandidatura
        );
    }
}
