import { DatabaseConnection } from "../../../../main/database/typeorm.connection";
import { UserModel } from "../../../models/user.model";
import { UserEntity } from "../../../shared/entities/user.entity";

export class UserRepository {
    private repository =
        DatabaseConnection.connection.getRepository(UserEntity);

    public async create(user: UserModel) {
        const userEntity = this.repository.create({
            id: user.id,
            empresa: user.empresa,
            nome: user.nome,
            senha: user.senha,
            tipo: user.tipo,
            username: user.userName,
        });

        const result = await this.repository.save(userEntity);

        return this.mapEntityToModel(result);
    }

    public async findByUsernamePassword(username: string, senha?: string) {
        const result = await this.repository.findOneBy({
            username,
            senha,
        });

        if (!result) {
            return null;
        }

        return this.mapEntityToModel(result);
    }

    private mapEntityToModel(userEntity: UserEntity) {
        const user = UserModel.create(
            userEntity.id,
            userEntity.nome,
            userEntity.username,
            userEntity.tipo,
            userEntity.senha,
            userEntity.empresa
        );

        return user;
    }

    public async find(tipo?: string){
        const result = await this.repository.findBy({tipo})

        return result.map(item => {
            return this.mapEntityToModel(item);
        })
    }

    public async get(id: string) {
        const result = await this.repository.findOneBy({id});

        if(!result) {
            return null
        }

        return this.mapEntityToModel(result);
    }
}
