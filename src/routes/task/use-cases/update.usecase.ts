import { capitalize } from '@/utils/genericFunctions';
import { HTTPResponse } from '@/utils/response';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UpdateByIdDto, UpdateTaskDto } from '../dtos/update.dto';
import { IUser } from '../task.controller';
import { TaskService } from '../task.service';

@Injectable()
export class UpdateTasksUseCase {
  constructor(private readonly taskService: TaskService) {}

  async execute(body: UpdateTaskDto, params: UpdateByIdDto, user: IUser) {
    const { id } = params;
    const { date, description, title } = body;
    const userId = Number(user.id);

    const payload: Prisma.TaskUpdateInput = {
      description,
      title: capitalize(title),
      date: new Date(date),
    };
    try {
      const response = await this.taskService.update(payload, id, userId);

      return HTTPResponse({
        data: response,
        message: 'Tarefa editado com sucesso',
        status: HttpStatus.OK,
      });
    } catch (error) {
      return HTTPResponse({
        data: error,
        message: 'Erro ao editar tarefa',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
