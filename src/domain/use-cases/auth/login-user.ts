import AppError from '../../../utils/app-error';
import { User } from '../../entities/user';
import { IUserRepository } from '../interfaces/user-respository';
import bcrypt from 'bcrypt';

export class LoginUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<User> {
    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Invalid email or password', 401);
    }

    return user;
  }
}
