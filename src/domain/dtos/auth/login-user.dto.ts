import { Validators } from '../../../config';

export class LoginUserDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ['email is required'];
    if (!Validators.email.test(email)) return ['email is not valid'];
    if (!password) return ['password is required'];
    if (password.length < 6) return ['password must be at least 6 characters'];

    return [undefined, new LoginUserDto(email.toLowerCase(), password)];
  }
}
