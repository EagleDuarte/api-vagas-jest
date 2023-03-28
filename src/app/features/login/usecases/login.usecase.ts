import { JwtHelper } from "../../../shared/util/jwt.helper";
import { UserRepository } from "../../user/repositories/user.repository";

interface LoginDTO {
    username: string;
    senha: string;
}

export class LoginUseCase {
    public async execute(data: LoginDTO) {
        const repository = new UserRepository();
        const result = await repository.findByUsernamePassword(
            data.username,
            data.senha
        );

        if (!result) {
            return null;
        }

        const user = result.toJson();

        // gerar o token de autenticação
        const token = JwtHelper.createToken(user);

        // retornar o usuario com o token
        return {
            ...user,
            token,
        };
    }
}
