import { RedisService } from '@/database/redis.service';
import { CreateSaltHash } from '@/utils/bcrypt';
import { HTTPResponse } from '@/utils/response';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ResetPasswordUpdateDto } from '../dtos/resetPasswordUpdate.dto';
import { UserService } from '../user.service';

@Injectable()
export class ResetPasswordUsersUpdateUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly redis: RedisService,
  ) {}

  async execute(body: ResetPasswordUpdateDto) {
    const { email, password, code } = body;

    try {
      const user = await this.userService.findByEmail(email);

      if (!user) {
        return HTTPResponse({
          data: null,
          message: 'Usuário não encontrado',
          status: HttpStatus.NOT_FOUND,
        });
      }

      try {
        const red = await this.redis.get('reset_password_' + email);
        if (!red) {
          return HTTPResponse({
            data: null,
            message: 'Código expirado',
            status: HttpStatus.BAD_REQUEST,
          });
        }

        if (red !== code) {
          return HTTPResponse({
            data: null,
            message: 'Código inválido',
            status: HttpStatus.BAD_REQUEST,
          });
        }

        const hashPassword = await CreateSaltHash(password);
        const response = await this.userService.updatePassword(
          email,
          hashPassword,
        );

        await this.redis.del('reset_password_' + email);

        return HTTPResponse({
          data: response,
          message: 'Senha alterada com sucesso',
          status: HttpStatus.OK,
        });
      } catch (error) {
        return HTTPResponse({
          data: error,
          message: 'Erro ao salvar no redis',
          status: HttpStatus.BAD_REQUEST,
        });
      }
    } catch (error) {
      console.log('error', error);
      return HTTPResponse({
        data: error,
        message: 'Erro ao buscar usuário',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
