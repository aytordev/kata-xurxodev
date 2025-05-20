export class Password {
  private readonly value: string;

  constructor(password: string) {
    this.validatePassword(password);
    this.value = password;
  }

  private validatePassword(password: string): void {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    if (!/[a-zA-Z]/.test(password)) {
      throw new Error('Password must contain at least one letter and one number');
    }
    if (!/\d/.test(password)) {
      throw new Error('Password must contain at least one letter and one number');
    }
  }

  equals(other: Password): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
