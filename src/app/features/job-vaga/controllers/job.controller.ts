import { Request, Response } from "express";
import { UserRepository } from "../../user/repositories/user.repository";
import { JobRepository } from "../repositories/job.repository";
import { ApplyJobUseCase } from "../usecases/apply-job.usecase";
import { CreateJobUseCase } from "../usecases/create-job.usecase";

export class JobController {
    public async create(req: Request, res: Response) {
        try {
            const {
                descricao,
                empresa,
                dtLimite,
                indAtivo,
                maxCandidatos,
                idRecrutador,
            } = req.body;

            const usecase = new CreateJobUseCase(
                new UserRepository(),
                new JobRepository()
            );
            const result = await usecase.execute({
                descricao,
                empresa,
                dtLimite,
                indAtivo,
                maxCandidatos,
                idRecrutador,
            });

            if (!result) {
                res.status(404).send({
                    ok: false,
                    message: "This recruiter does not exists.",
                });
            }

            return res.status(201).send({
                ok: true,
                message: "Job created sucessfully.",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async apply(req: Request, res: Response) {
        try {
            const { idCandidato, indSucesso } = req.body;
            const { idVaga } = req.params;

            const usecase = new ApplyJobUseCase();
            const result = await usecase.execute({
                idCandidato,
                idVaga,
                indSucesso,
            });

            if (!result) {
                return res.status(404).send({
                    ok: false,
                    message: "Usuario/vaga not found.",
                });
            }

            return res.status(201).send({
                ok: true,
                message: "Candidacy created sucessfuly.",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
