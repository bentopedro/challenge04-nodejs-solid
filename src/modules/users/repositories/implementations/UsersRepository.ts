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
        const confirmedUser = this.users.find(
            (user) => user.id === receivedUser.id
        );
        // const confirmedUser = this.findById(receivedUser.id);

        if (!confirmedUser) {
            throw new Error("User isn't confirmed");
        }

        confirmedUser.admin = true;
        confirmedUser.updated_at = new Date();

        return confirmedUser;
    }

    list(): User[] {
        return this.users;
    }
}

export { UsersRepository };
