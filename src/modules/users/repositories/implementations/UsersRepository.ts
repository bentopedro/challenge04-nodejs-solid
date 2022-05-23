import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private users: User[];

    private static INSTANCE: UsersRepository;

    private constructor() {
        this.users = [];
    }

    public static getInstance(): UsersRepository {
        if (!UsersRepository.INSTANCE) {
            UsersRepository.INSTANCE = new UsersRepository();
        }

        return UsersRepository.INSTANCE;
    }

    // create({ name, email }: ICreateUserDTO): User {
    create({ name, email }: ICreateUserDTO): User {
        const createUser = new User();

        Object.assign(createUser, {
            name,
            email,
            created_at: new Date(),
            updated_at: new Date(),
        });

        this.users.push(createUser);

        return createUser;
    }

    findById(id: string): User | undefined {
        const user = this.users.find((user) => user.id === id);

        return user;
    }

    findByEmail(email: string): User | undefined {
        const user = this.users.find((user) => user.email === email);

        return user;
    }

    turnAdmin(receivedUser: User): User {
        const updateUser = Object.assign(receivedUser, {
            admin: true,
            updated_at: new Date(),
        });

        this.users.push(updateUser);

        return updateUser;
    }

    list(): User[] {
        return this.users;
    }
}

export { UsersRepository };
