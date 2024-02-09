import { HTTPResponse } from '@/utils/response';
import { HttpStatus, Injectable } from '@nestjs/common';

import { DeleteByIdDto } from '../dtos/delete.dto';
import { UserService } from '../user.service';

@Injectable()
export class DeleteUsersUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(query: DeleteByIdDto) {
    const { id } = query;
    try {
      const response = await this.userService.delete(id);

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
