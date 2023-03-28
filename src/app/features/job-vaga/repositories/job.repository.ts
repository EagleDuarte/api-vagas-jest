import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { UserModel } from "../../../models/user.model";
import { JobModel } from "../../../models/job.model";
import { JobEntity } from "../../../shared/entities/job.entity";

export class JobRepository {
    private repository =
        DatabaseConnection.connection.getRepository(JobEntity);

    public async create(vaga: JobModel) {
        const JobEntity = this.repository.create({
            id: vaga.id,
            descricao: vaga.descricao,
            dtLimite: vaga.dtLimite,
            indAtivo: vaga.indAtivo,
            idRecrutador: vaga.recrutador.id,
            maxCandidatos: vaga.maxCandidatos,
        });

        await this.repository.save(JobEntity);

        const createdVaga = await this.repository.findOneBy({
            id: vaga.id,
        });

        return this.mapEntityToModel(createdVaga!);
    }

    public async find(id: string) {
        const result = await this.repository.findOne({
            relations: {
                candidaturas: true,
            },
            where: {
                id,
            },
        });

        if (!result) {
            return null;
        }

        return this.mapEntityToModel(result);
    }

    private mapEntityToModel(JobEntity: JobEntity) {
        const recrutador = UserModel.create(
            JobEntity.recrutador.id,
            JobEntity.recrutador.nome,
            JobEntity.recrutador.username,
            JobEntity.recrutador.tipo,
            JobEntity.recrutador.senha,
            JobEntity.recrutador.empresa
        );

        const vaga = JobModel.create(
            JobEntity.id,
            JobEntity.descricao,
            JobEntity.recrutador.empresa,
            JobEntity.dtLimite,
            JobEntity.indAtivo,
            recrutador,
            JobEntity.maxCandidatos
        );

        return vaga;
    }

    public async list() {
       const result = await this.repository.find();
       const vagas = result.map(item => {
        return this.mapEntityToModel(item)
       })

       return vagas;
    }
}
