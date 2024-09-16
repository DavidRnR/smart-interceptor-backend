import User from '../models/User';

class UserRepository {
  public async findById(id: number) {
    return User.findByPk(id);
  }

  public async findByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  public async create(userData: Partial<User>) {
    return User.create(userData);
  }

  public async update(id: number, userData: Partial<User>) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return user.update(userData);
  }

  public async delete(id: number) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return user.destroy();
  }
}

export default new UserRepository();
