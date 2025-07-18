import { Response, NextFunction } from 'express';
import { CustomRequest } from '../../types';
import { IUserRepository } from '../../domain/use-cases/interfaces/user-respository';
import catchAsync from '../../utils/catch-async';
import { LoginUser } from '../../domain/use-cases/auth/login-user';

export class AuthController {
  constructor(private userRepository: IUserRepository) {}

  login = catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      const loginUser = new LoginUser(this.userRepository);
      const user = await loginUser.execute(email, password);

      res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: { user: { id: user.id, email: user.email } },
        errors: null,
      });
    }
  );
}
