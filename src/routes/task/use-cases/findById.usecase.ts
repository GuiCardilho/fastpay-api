import { HTTPResponse } from '@/utils/response';
import { HttpStatus, Injectable } from '@nestjs/common';
import { FindByIdDto } from '../dtos/findById';
import { IUser } from '../task.controller';
import { TaskService } from '../task.service';

@Injectable()
export class FindByIdUseCase {
  constructor(private readonly taskService: TaskService) {}

  async execute(query: FindByIdDto, user: IUser) {
    const { id } = query;

    try {
      const response = await this.taskService.findById(id, Number(user.id));

      return HTTPResponse({
        data: response,
        message: 'Tarefa encontrado com sucesso',
        status: HttpStatus.OK,
      });
    } catch (error) {
      return HTTPResponse({
        data: error,
        message: 'Erro ao encontrar tarefa',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
