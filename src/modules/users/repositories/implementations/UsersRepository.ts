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

  create({ name, email }: ICreateUserDTO): User {
    const user = new User(); /* Cria um novo User */

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
      admin: false,
    }); /* Escreve no objeto as propriedades recebidas */

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const userId = this.users.find((user) => user.id === id);

    return userId;
  }

  findByEmail(email: string): User | undefined {
    const userEmail = this.users.find((user) => user.email === email);

    return userEmail;
  }

  turnAdmin(receivedUser: User): User {
    const updatedUser = this.users.find((user) => user === receivedUser);

    updatedUser.admin = true;
    updatedUser.updated_at = new Date();
    updatedUser.created_at = new Date();

    return updatedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
