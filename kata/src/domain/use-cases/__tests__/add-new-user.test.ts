import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/user';
import { Email } from '../../value-objects/Email';
import { Password } from '../../value-objects/Password';
import { AddNewUser, UserAlreadyExistsError } from '../add-new-user';

describe('AddNewUser', () => {
  let addNewUser: AddNewUser;
  let mockUserRepository: jest.Mocked<UserRepository>;

  const newUser = User.create({
    id: '1',
    name: 'David Parras',
    email: new Email('david@example.com'),
    password: new Password('Pass1234')
  });

  const createdUser = newUser;

  beforeEach(() => {
    mockUserRepository = {
      save: jest.fn().mockResolvedValue(createdUser),
      findByEmail: jest.fn().mockResolvedValue(null),
      findAll: jest.fn(),
    };

    addNewUser = new AddNewUser(mockUserRepository);
  });

  it('should add a new user when email is not in use', async () => {
    const result = await addNewUser.execute(newUser);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(newUser.getEmail().toString());
    expect(mockUserRepository.save).toHaveBeenCalledWith(newUser);
    expect(result).toEqual(createdUser);
  });

  it('should throw UserAlreadyExistsError when email is already in use', async () => {
    mockUserRepository.findByEmail.mockResolvedValueOnce(createdUser);

    await expect(addNewUser.execute(newUser))
      .rejects
      .toThrow(UserAlreadyExistsError);

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(newUser.getEmail().toString());
    expect(mockUserRepository.save).not.toHaveBeenCalled();
  });
});
