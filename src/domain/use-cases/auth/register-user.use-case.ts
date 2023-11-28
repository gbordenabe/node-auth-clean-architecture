import { JwtAdapter } from '../../../config';
import { RegisterUserDto } from '../../dtos/auth/register-user.dto';
import { CustomError } from '../../errors/custom.error';
import { UserToken } from '../../interfaces/UserToken.interface';
import { AuthRepository } from '../../repositories/auth.repository';
import { SingToken } from '../../types/SingToken.type';

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly singToken: SingToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    const { id, name, email } = await this.authRepository.register(
      registerUserDto
    );

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
