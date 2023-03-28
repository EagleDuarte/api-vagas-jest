import jwt from "jsonwebtoken";
import { authEnv } from "../../envs/auth.env";

export class JwtHelper {
    public static createToken(data: any) {
        return jwt.sign(data, authEnv.secret!);
    }

    public static verificarToken(token: string) {
        return jwt.verify(token, authEnv.secret!);
    }
}
