import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User no exists");
    }

    const userAdmin = user.admin === true;

    if (!userAdmin) {
      throw new Error(
        "the user does not have permission levels for this query"
      );
    }
    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
