import { Email } from '../../value-objects/Email';
import { Password } from '../../value-objects/Password';
import { User } from '../User';

describe('User Entity', () => {
    it('should create a user with valid data', () => {
        const user = User.create({
            id: '1',
            name: 'Nombre',
            email: new Email('nombre@example.com'),
            password: new Password('Pass1234')
        });
        expect(user).toBeInstanceOf(User);
    });

    it('should throw error when required fields are missing', () => {
        expect(() => User.create({ id: '', name: 'Nombre', email: new Email('nombre@example.com'), password: new Password('Pass1234') }))
            .toThrow('Id, name, email, and password are required');

        expect(() => User.create({ id: '1', name: '', email: new Email('nombre@example.com'), password: new Password('Pass1234') }))
            .toThrow('Id, name, email, and password are required');

        expect(() => new Email('')).toThrow('Invalid email format');

        expect(() => new Password('')).toThrow('Password must be at least 8 characters long');

        expect(() => {
            // @ts-ignore - Testing invalid input
            User.create({ id: '1', name: 'John Doe', email: new Email('john@example.com') });
        }).toThrow('Id, name, email, and password are required');
    });

    it('should consider users equal when they have the same id', () => {
        const user1 = User.create({
            id: '1',
            name: 'Nombre',
            email: new Email('nombre@example.com'),
            password: new Password('Pass1234')
        });
        const user2 = User.create({
            id: '1',
            name: 'Nombre',
            email: new Email('nombre@example.com'),
            password: new Password('Pass1234')
        });
        expect(user1.equals(user2)).toBe(true);
    });

    it('should not consider users equal when they have different ids', () => {
        const user1 = User.create({
            id: '1',
            name: 'Nombre',
            email: new Email('nombre@example.com'),
            password: new Password('Pass1234')
        });
        const user2 = User.create({
            id: '2',
            name: 'Nombre',
            email: new Email('nombre@example.com'),
            password: new Password('Pass1234')
        });
        expect(user1.equals(user2)).toBe(false);
    });

    it('should store email as Email value object', () => {
        const user = User.create({
            id: '1',
            name: 'Nombre',
            email: new Email('nombre@example.com'),
            password: new Password('Pass1234')
        });
        expect(user.getEmail()).toBeInstanceOf(Email);
    });

    it('should store password as Password value object', () => {
        const password = new Password('Pass1234');
        const user = User.create({
            id: '1',
            name: 'Nombre',
            email: new Email('nombre@example.com'),
            password: password
        });
        const sameUser = User.create({
            id: '1',
            name: 'Nombre',
            email: new Email('nombre@example.com'),
            password: new Password('Pass1234')
        });
        expect(user.equals(sameUser)).toBe(true);
    });
});
