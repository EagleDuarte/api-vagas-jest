import { NextFunction, Request, Response } from "express";

export const checkLoginRecruiterMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userHeader = req.headers["user"];

        if (!userHeader) {
            return res.status(401).send({
                ok: false,
                message: "Token not provided, login first.",
            });
        }

        const user = JSON.parse(userHeader.toString());

        if (user.tipo !== "R") {
            return res.status(403).send({
                ok: false,
                message: "User must be a recruiter.",
            });
        }

        req.body = {
            ...req.body,
            idRecrutador: user.id,
        };

        return next();
    } catch (error: any) {
        return res.status(401).send({
            ok: false,
            message: "Invalid token, login first.",
        });
    }
};
