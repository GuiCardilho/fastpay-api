import { HTTPResponse } from '@/utils/response';
import { HttpStatus, Injectable } from '@nestjs/common';

import { IUser } from '@routes/task/task.controller';
import { DeleteByIdDto } from '../dtos/delete.dto';
import { UserService } from '../user.service';

@Injectable()
export class DeleteUsersUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(query: DeleteByIdDto, user: IUser) {
    const { id } = query;
    const { id: userId } = user;

    if (Number(id) === Number(userId)) {
      return HTTPResponse({
        data: null,
        message: 'Você não pode deletar seu próprio usuário',
        status: HttpStatus.BAD_REQUEST,
      });
    }
    try {
      const response = await this.userService.delete(Number(id));

      return HTTPResponse({
        data: response,
        message: 'Usuario deletado com sucesso',
        status: HttpStatus.OK,
      });
    } catch (error) {
      return HTTPResponse({
        data: error,
        message: 'Erro ao deletar usuario',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
