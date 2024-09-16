import User from '../models/User';

class UserDTO {
  public id: number;
  public email: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
  }
}

export default UserDTO;
