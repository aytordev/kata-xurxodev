import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/user';
import { Email } from '../../value-objects/Email';
import { Password } from '../../value-objects/Password';
import { GetUserList } from '../get-user-list';

const mockUsers: User[] = [
  User.create({
    id: '1',
    name: 'Aytor',
    email: new Email('aytor@example.com'),
    password: new Password('Pass1234')
  }),
  User.create({
    id: '2',
    name: 'David Parras',
    email: new Email('david@example.com'),
    password: new Password('Pass1234')
  })
];

describe('GetUserList', () => {
  let getUserList: GetUserList;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findAll: jest.fn().mockResolvedValue(mockUsers),
      save: jest.fn(),
      findByEmail: jest.fn(),
    };
    getUserList = new GetUserList(mockUserRepository);
  });

  it('should return a list of users', async () => {
    const result = await getUserList.execute();
    
    // Solo verificamos el resultado esperado, no cómo se obtuvo
    expect(result).toHaveLength(2);
    expect(result[0].getName()).toBe('Aytor');
    expect(result[1].getName()).toBe('David Parras');
  });
});
