import { UserModel } from "./user.model";

export class RecruiterModel extends UserModel {
    constructor(
        nome: string,
        userName: string,
        senha: string,
        empresa: string
    ) {
        super(nome, userName, senha, "R", empresa);
    }
}
