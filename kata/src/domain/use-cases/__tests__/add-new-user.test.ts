import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/user';
import { Email } from '../../value-objects/Email';
import { Password } from '../../value-objects/Password';
import { AddNewUser } from '../add-new-user';

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

  // No acoplar los test a la implementacion del caso de uso. Validar el estado de salida (success o error)
  it('should add a new user when email is not in use', async () => {
    const result = await addNewUser.execute(newUser);
    
    // Verificamos que el resultado es el usuario creado con los datos correctos
    expect(result).toBeInstanceOf(User);
    expect(result.getName()).toBe('David Parras');
    expect(result.getEmail().toString()).toBe('david@example.com');
  });

  it('should throw an error when email is already in use', async () => {
    // Configuramos el mock para que devuelva un usuario existente
    mockUserRepository.findByEmail.mockResolvedValueOnce(createdUser);

    // Verificamos que se lanza la excepción con el mensaje correcto
    await expect(addNewUser.execute(newUser))
      .rejects
      .toThrow('User with email david@example.com already exists');
  });
});
