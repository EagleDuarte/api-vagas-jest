import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewToTest implements MigrationInterface {
    name = 'CreateNewToTest'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vagas"."candidatura" ("id_candidato" character varying NOT NULL, "id_vaga" character varying NOT NULL, "id_sucesso" boolean NOT NULL, "dtCandidatura" TIMESTAMP NOT NULL, CONSTRAINT "" PRIMARY KEY ("id_candidato", "id_vaga"))`);
        await queryRunner.query(`ALTER TABLE "vagas"."candidatura" ADD CONSTRAINT "" FOREIGN KEY ("id_candidato") REFERENCES "vagas"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vagas"."candidatura" ADD CONSTRAINT "" FOREIGN KEY ("id_vaga") REFERENCES "vagas"."vaga"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vagas"."candidatura" DROP CONSTRAINT ""`);
        await queryRunner.query(`ALTER TABLE "vagas"."candidatura" DROP CONSTRAINT ""`);
        await queryRunner.query(`DROP TABLE "vagas"."candidatura"`);
    }

}
