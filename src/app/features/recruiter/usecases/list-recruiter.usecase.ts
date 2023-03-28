import { UserRepository } from "../../user/repositories/user.repository";

export class ListRecruiterUseCase {
    public async execute() {
        const repository = new UserRepository();

        const result = await repository.find('R');

        return result.map(item => {
            return item.toJson();
        })
    }
}