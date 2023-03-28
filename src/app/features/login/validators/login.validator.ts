import { NextFunction, Request, Response } from "express";

export const loginValidator = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, senha } = req.body;

        if (!username) {
            return res.status(400).send({
                ok: false,
                message: "username não informado",
            });
        }
        if (!senha) {
            return res.status(400).send({
                ok: false,
                message: "senha não informada",
            });
        }

        next();
    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
};
