import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";
import { JobEntity } from "./job.entity";

@Entity({
    name: "candidatura",
})
export class CandidacyEntity {
    @PrimaryColumn({
        name: "id_candidato",
    })
    idCandidato: string;

    @PrimaryColumn({
        name: "id_vaga",
    })
    idVaga: string;

    @Column({
        name: "id_sucesso",
    })
    indSucesso: boolean;

    @Column()
    dtCandidatura: Date;

    @ManyToOne(() => UserEntity, {
        eager: true,
    })
    @JoinColumn({
        name: "id_candidato",
    })
    candidato: UserEntity;

    @ManyToOne(() => JobEntity, {
        eager: true,
    })
    @JoinColumn({
        name: "id_vaga",
    })
    vaga: JobEntity;
}
