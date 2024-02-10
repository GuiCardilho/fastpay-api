import { RedisService } from '@/database/redis.service';
import { HTTPResponse } from '@/utils/response';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ResetPasswordDto } from '../dtos/resetPassword.dto';
import { UserService } from '../user.service';

@Injectable()
export class ResetPasswordUsersUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly redis: RedisService,
  ) {}

  async execute(body: ResetPasswordDto) {
    const { email } = body;
    const resend = new Resend(process.env.RESEND_KEY);

    const code = Math.floor(1000 + Math.random() * 9000);

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
        const { data, error } = await resend.emails.send({
          from: 'noreplyfastpay@gustavocardilho.tech',
          to: email,
          subject: 'Redefinição de senha',
          html: `<p>Seu Codigo de Redifinição de senha é: <strong>${code}</strong></p>`,
        });

        if (error) {
          return HTTPResponse({
            data: error,
            message: 'Erro ao enviar email',
            status: HttpStatus.BAD_REQUEST,
          });
        }
      } catch (error) {
        return HTTPResponse({
          data: error,
          message: 'Erro ao enviar email',
          status: HttpStatus.BAD_REQUEST,
        });
      }

      try {
        const red = await this.redis.set('reset_password_' + email, code);
        await this.redis.expire('reset_password_' + email, 60 * 5);

        return HTTPResponse({
          data: red,
          message: 'Email enviado com sucesso',
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
