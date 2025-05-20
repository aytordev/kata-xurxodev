import { User } from '../../../domain/entities/User';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { InMemoryUserRepository } from '../in-memory-user-repository';

describe('InMemoryUserRepository', () => {
  let repository: InMemoryUserRepository;

  const testUser1 = User.create({
    id: '1',
    name: 'Aytor',
    email: new Email('aytor@example.com'),
    password: new Password('Pass1234')
  });

  const testUser2 = User.create({
    id: '2',
    name: 'David Parras',
    email: new Email('david@example.com'),
    password: new Password('Pass1234')
  });

  beforeEach(() => {
    repository = new InMemoryUserRepository();
  });

  describe('save', () => {
    it('should save a user', async () => {
      await repository.save(testUser1);
      const foundUser = await repository.findByEmail('aytor@example.com');

      expect(foundUser).not.toBeNull();
      expect(foundUser?.getId()).toBe('1');
      expect(foundUser?.getName()).toBe('Aytor');
      expect(foundUser?.getEmail().toString()).toBe('aytor@example.com');
    });

    it('should update an existing user', async () => {
      await repository.save(testUser1);

      const updatedUser = User.create({
        id: testUser1.getId(),
        name: 'Aytor Updated',
        email: testUser1.getEmail(),
        password: testUser1.getPassword()
      });

      await repository.save(updatedUser);
      const foundUser = await repository.findByEmail('aytor@example.com');

      expect(foundUser?.getName()).toBe('Aytor Updated');
    });
  });

  describe('findByEmail', () => {
    it('should return null when user is not found', async () => {
      const user = await repository.findByEmail('nonexistent@example.com');
      expect(user).toBeNull();
    });

    it('should find a user by email', async () => {
      await repository.save(testUser1);
      const foundUser = await repository.findByEmail('aytor@example.com');

      expect(foundUser).not.toBeNull();
      expect(foundUser?.getEmail().toString()).toBe('aytor@example.com');
    });

    it('should be case sensitive when finding by email', async () => {
      await repository.save(testUser1);
      const foundUser = await repository.findByEmail('AYTOR@example.com');

      expect(foundUser).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return an empty array when no users exist', async () => {
      const users = await repository.findAll();
      expect(users).toEqual([]);
    });

    it('should return all users', async () => {
      await repository.save(testUser1);
      await repository.save(testUser2);

      const users = await repository.findAll();

      expect(users).toHaveLength(2);
      expect(users).toEqual(expect.arrayContaining([testUser1, testUser2]));
    });
  });

  describe('clear', () => {
    it('should remove all users', async () => {
      await repository.save(testUser1);
      await repository.save(testUser2);

      repository.clear();
      const users = await repository.findAll();

      expect(users).toHaveLength(0);
    });
  });

  describe('seed', () => {
    it('should seed multiple users at once', async () => {
      repository.seed([testUser1, testUser2]);

      const users = await repository.findAll();

      expect(users).toHaveLength(2);
      expect(users).toEqual(expect.arrayContaining([testUser1, testUser2]));
    });
  });
});
