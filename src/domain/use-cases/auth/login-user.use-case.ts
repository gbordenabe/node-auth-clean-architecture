import { JwtAdapter } from '../../../config';
import { LoginUserDto } from '../../dtos/auth/login-user.dto';
import { CustomError } from '../../errors/custom.error';
import { UserToken } from '../../interfaces/UserToken.interface';
import { AuthRepository } from '../../repositories/auth.repository';
import { SingToken } from '../../types/SingToken.type';

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly singToken: SingToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    const { id, name, email } = await this.authRepository.login(loginUserDto);
    const token = await this.singToken({ id });
    if (!token)
      throw CustomError.internalServerError('Error on generate token');

    return {
      token,
      user: {
        id,
        name,
        email,
      },
    };
  }
}
