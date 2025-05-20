import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/user';

export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  async save(user: User): Promise<User> {
    this.users.set(user.getId(), user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.getEmail().toString() === email) {
        return user;
      }
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  clear(): void {
    this.users.clear();
  }

  seed(users: User[]): void {
    users.forEach(user => this.users.set(user.getId(), user));
  }
}
