import { capitalize } from '@/utils/genericFunctions';
import { HTTPResponse } from '@/utils/response';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateSaltHash } from '@/utils/bcrypt';
import { CreateUserDto } from '../dtos/create.dto';
import { UserService } from '../user.service';

@Injectable()
export class CreateUsersUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(body: CreateUserDto) {
    const { email, password, phone, name } = body;

    try {
      const verifyEmail = await this.userService.findByEmail(email);
      if (verifyEmail) {
        return HTTPResponse({
          data: null,
          message: 'E-mail já cadastrado',
          status: HttpStatus.BAD_REQUEST,
        });
      }

      const verifyPhone = await this.userService.findByPhone(phone);
      if (verifyPhone) {
        return HTTPResponse({
          data: null,
          message: 'Telefone já cadastrado',
          status: HttpStatus.BAD_REQUEST,
        });
      }
    } catch (error) {
      return HTTPResponse({
        data: error,
        message: 'Erro ao criar usuario',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const hashPassword = await CreateSaltHash(password);

    const payload: Prisma.UserCreateInput = {
      email: email.toLowerCase().trim(),
      password: hashPassword,
      phone: phone.replace(/\D/g, ''),
      name: capitalize(name),
    };
    try {
      const response = await this.userService.create(payload);

      return HTTPResponse({
        data: response,
        message: 'Usuario criado com sucesso',
        status: HttpStatus.CREATED,
      });
    } catch (error) {
      throw HTTPResponse({
        data: error,
        message: 'Erro ao criar usuario',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
