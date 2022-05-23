import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id: string;
}

class ListAllUsersUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    execute({ user_id }: IRequest): User[] {
        const adminUser = this.usersRepository.findById(user_id);

        if (adminUser.admin === false) {
            throw new Error("USer is not admin");
        }

        const users = this.usersRepository.list();
        return users;
    }
}

export { ListAllUsersUseCase };
