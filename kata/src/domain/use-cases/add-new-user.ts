import { User } from '../entities/User';
import { UserRepository } from '../repositories/user';

export class UserAlreadyExistsError extends Error {
    constructor(email: string) {
        super(`User with email ${email} already exists`);
        this.name = 'UserAlreadyExistsError';
    }
}

export class AddNewUser {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(userData: User): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(userData.getEmail().toString());

        if (existingUser) {
            throw new UserAlreadyExistsError(userData.getEmail().toString());
        }

        return this.userRepository.save(userData);
    }
}
