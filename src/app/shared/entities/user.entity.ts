import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({
    name: "user",
})
export class UserEntity {
    @PrimaryColumn()
    id!: string;

    @Column({
        length: 60,
    })
    nome: string;

    @Column({
        length: 60,
        unique: true,
    })
    username: string;

    @Column()
    senha: string;

    @Column()
    tipo: string;

    @Column({
        length: 60,
        nullable: true,
    })
    empresa: string;

    @CreateDateColumn({
        name: "created_at",
    })
    create: Date;

    @UpdateDateColumn({
        name: "updated_at",
    })
    update: Date;
}
