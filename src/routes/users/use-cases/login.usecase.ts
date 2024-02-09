import { compareHash } from '@/utils/bcrypt';
import { createJWT } from '@/utils/jwtMethods';
import { HTTPResponse } from '@/utils/response';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto } from '../dtos/login.dto';
import { UserService } from '../user.service';

@Injectable()
export class LoginUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(body: LoginUserDto) {
    const { email, password } = body;

    const verifyEmail = await this.userService.findByEmail(email);

    if (!verifyEmail) {
      throw new HttpException(
        'Email ou Senha inválidos',
        HttpStatus.BAD_REQUEST,
      );
    }

    const verifyPassword = await compareHash(password, verifyEmail.password);
    if (!verifyPassword) {
      throw new HttpException(
        'Email ou Senha inválidos',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const response = createJWT(verifyEmail);

      return HTTPResponse({
        data: response,
        message: 'Login realizado com sucesso',
        status: HttpStatus.OK,
      });
    } catch (error) {
      return HTTPResponse({
        data: error,
        message: 'Erro ao realizar login',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
