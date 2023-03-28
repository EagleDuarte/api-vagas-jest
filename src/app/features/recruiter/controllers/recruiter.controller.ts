
import { Request, Response } from "express";
import { CreateRecruiterUseCase } from "../usecases/create-recruiter.usecase";
import { ListRecruiterUseCase } from "../usecases/list-recruiter.usecase";

export class RecruiterController {
    public async create(req: Request, res: Response) {
        try {
            const { nome, username, senha, empresa } = req.body;
            const usecase = new CreateRecruiterUseCase();
            const result = await usecase.execute({
                nome,
                userName: username,
                senha,
                empresa,
            });

            return res.status(200).send({
                ok: true,
                message: "Recruiter created sucessfully.",
                data: result,
            });
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async list(req: Request, res: Response) {
        try {
            const usecase = new ListRecruiterUseCase();
            const result = await usecase.execute();
    
    
            return res.status(200).send({
                ok: true,
                message: "Recruiters listed sucessfully.",
                data: result,
            })
        } catch(error: any){
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
   
    }

    public update() {}
}
