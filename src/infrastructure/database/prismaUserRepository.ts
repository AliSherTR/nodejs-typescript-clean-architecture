import { User } from '../../domain/entities/user';
import { IUserRepository } from '../../domain/use-cases/interfaces/user-respository';
import prisma from './prisma';

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new User(user.id, user.email, user.password, user.name);
  }
}
