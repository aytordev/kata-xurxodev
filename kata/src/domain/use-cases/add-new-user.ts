import { User } from '../entities/User';
import { UserRepository } from '../repositories/user';

export class AddNewUser {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(userData: User): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(userData.getEmail().toString());

        if (existingUser) {
            throw new Error(`User with email ${userData.getEmail().toString()} already exists`);
        }

        return this.userRepository.save(userData);
    }
}
