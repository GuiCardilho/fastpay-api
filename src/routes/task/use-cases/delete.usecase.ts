import { HTTPResponse } from '@/utils/response';
import { HttpStatus, Injectable } from '@nestjs/common';

import { DeleteByIdDto } from '../dtos/delete.dto';
import { IUser } from '../task.controller';
import { TaskService } from '../task.service';

@Injectable()
export class DeleteTasksUseCase {
  constructor(private readonly taskService: TaskService) {}

  async execute(query: DeleteByIdDto, user: IUser) {
    const { id } = query;
    const userId = Number(user.id);

    try {
      const response = await this.taskService.delete(id, userId);

      return HTTPResponse({
        data: response,
        message: 'Tarefa deletado com sucesso',
        status: HttpStatus.OK,
      });
    } catch (error) {
      return HTTPResponse({
        data: error,
        message: 'Erro ao deletar tarefa',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
