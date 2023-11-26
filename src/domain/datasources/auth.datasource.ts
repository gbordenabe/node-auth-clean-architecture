import { UserEntity } from '../entities/user.entity';

export abstract class AuthDatasource {
  abstract register(
    name: string,
    email: string,
    password: string
  ): Promise<UserEntity>;
}
