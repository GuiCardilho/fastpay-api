import { HTTPResponse } from '@/utils/response';
import { HttpStatus, Injectable } from '@nestjs/common';
import { FindByIdDto } from '../dtos/findById';
import { UserService } from '../user.service';

@Injectable()
export class FindByIdUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(query: FindByIdDto) {
    const { id } = query;

    try {
      const response = await this.userService.findById(id);

      return HTTPResponse({
        data: response,
        message: 'Usuário encontrado com sucesso',
        status: HttpStatus.OK,
      });
    } catch (error) {
      return HTTPResponse({
        data: error,
        message: 'Erro ao encontrar usuário',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
