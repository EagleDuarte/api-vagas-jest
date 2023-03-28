import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { CandidacyEntity } from "./candidacy.entity";
import { UserEntity } from "./user.entity";

@Entity({
    name: "vaga",
})
export class JobEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    descricao: string;

    @Column()
    dtLimite: Date;

    @Column()
    indAtivo: boolean;

    @Column()
    maxCandidatos: number;

    @Column({
        name: "id_recrutador",
    })
    idRecrutador: string;

    @CreateDateColumn({
        name: "created_at",
    })
    create: Date;

    @UpdateDateColumn({
        name: "updated_at",
    })
    update: Date;

    @ManyToOne(() => UserEntity, {
        eager: true,
    })
    @JoinColumn({
        name: "id_recrutador",
    })
    recrutador: UserEntity;

    @OneToMany(() => CandidacyEntity, (cand) => cand.vaga)
    candidaturas: CandidacyEntity[];
}
