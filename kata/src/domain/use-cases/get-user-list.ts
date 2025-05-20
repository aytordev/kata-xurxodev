import { User } from '../entities/User';
import { UserRepository } from '../repositories/user';

export class GetUserList {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}
