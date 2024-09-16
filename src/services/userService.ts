import UserDTO from '../dto/userDTO';
import User from '../models/User';
import userRepository from '../repositories/userRepository';

class UserService {
  public async getUserById(id: number) {
    const user = await userRepository.findById(id);
    if (!user) throw new Error('User not found');
    return new UserDTO(user);
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('User not found');
    return user;
  }

  public async createUser(userData: Partial<User>) {
    const existingUser = await userRepository.findByEmail(userData.email!);
    if (existingUser) throw new Error('User already exists');
    const user = await userRepository.create(userData);
    return new UserDTO(user);
  }

  public async updateUser(id: number, userData: Partial<UserDTO>) {
    const user = await userRepository.update(id, userData);
    return new UserDTO(user);
  }

  public async deleteUser(id: number) {
    await userRepository.delete(id);
  }
}

export default new UserService();
