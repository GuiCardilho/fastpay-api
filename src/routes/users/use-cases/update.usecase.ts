import { capitalize } from '@/utils/genericFunctions';
import { HTTPResponse } from '@/utils/response';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UpdateByIdDto, UpdateUserDto } from '../dtos/update.dto';
import { UserService } from '../user.service';

@Injectable()
export class UpdateUsersUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(body: UpdateUserDto, params: UpdateByIdDto) {
    const { id } = params;
    const { email, phone, name } = body;

    const payload: Prisma.UserUpdateInput = {
      email: email.toLowerCase().trim(),
      phone: phone.replace(/\D/g, ''),
      name: capitalize(name),
    };
    try {
      const response = await this.userService.update(payload, id);

      return HTTPResponse({
        data: response,
        message: 'Usuario editado com sucesso',
        status: HttpStatus.OK,
      });
    } catch (error) {
      return HTTPResponse({
        data: error,
        message: 'Erro ao editar usuario',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
