import { Email } from '../value-objects/Email';
import { Password } from '../value-objects/Password';

type UserProps = {
  id: string;
  name: string;
  email: Email;
  password: Password;
};

export class User {
  private constructor(
    private id: string,
    private name: string,
    private email: Email,
    private password: Password
  ) { }

  static create({ id, name, email, password }: UserProps): User {
    if (!id || !name || !email || !password) {
      throw new Error('Id, name, email, and password are required');
    }

    if (!(email instanceof Email) || !(password instanceof Password)) {
      throw new Error('Invalid email or password format');
    }

    return new User(id, name, email, password);
  }

  update({ name, email, password }: UserProps): void {
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }

    this.name = name;
    this.email = email;
    this.password = password;
  }

  equals(other: User): boolean {
    return this.id === other.id;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): Email {
    return this.email;
  }

  getPassword(): Password {
    return this.password;
  }
}
