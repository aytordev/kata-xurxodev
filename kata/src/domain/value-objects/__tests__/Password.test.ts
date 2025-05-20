import { Password } from '../Password';

describe('Password Value Object', () => {
    it('should create a valid password', () => {
        const password = new Password('ValidPassword1234');
        expect(password.toString()).toBe('ValidPassword1234');
    });

    it('should throw error for password shorter than 8 characters', () => {
        expect(() => new Password('short')).toThrow('Password must be at least 8 characters long');
    });

    it('should throw error if password has no letters', () => {
        expect(() => new Password('12345678')).toThrow('Password must contain at least one letter and one number');
    });

    it('should throw error if password has no numbers', () => {
        expect(() => new Password('password')).toThrow('Password must contain at least one letter and one number');
    });

    it('should consider passwords equal when they have the same value', () => {
        const pass1 = new Password('SamePassword1234');
        const pass2 = new Password('SamePassword1234');
        expect(pass1.equals(pass2)).toBe(true);
    });
});
