import { Email } from '../Email';

describe('Email Value Object', () => {
    it('should create a valid email', () => {
        const email = new Email('test@example.com');
        expect(email.toString()).toBe('test@example.com');
    });

    it('should throw error for invalid email', () => {
        expect(() => new Email('invalid-email')).toThrow('Invalid email format');
    });

    it('should consider emails equal when they have the same value', () => {
        const email1 = new Email('test@example.com');
        const email2 = new Email('test@example.com');
        expect(email1.equals(email2)).toBe(true);
    });
});
