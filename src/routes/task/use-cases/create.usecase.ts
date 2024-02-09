import { HTTPResponse } from '@/utils/response';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { CreateTaskDto } from '../dtos/create.dto';
import { IUser } from '../task.controller';
import { TaskService } from '../task.service';

@Injectable()
export class CreateTasksUseCase {
  constructor(private readonly taskService: TaskService) {}

  async execute(body: CreateTaskDto, user: IUser) {
    const { date, description, title } = body;

    const formatedDate = new Date(date);
    const userId = Number(user.id);

    const payload: Prisma.TaskCreateInput = {
      description,
      title,
      date: formatedDate,

      user: {
        connect: {
          id: userId,
        },
      },
    };

    try {
      const response = await this.taskService.create(payload);

      return HTTPResponse({
        data: response,
        message: 'Tarefa criada com sucesso',
        status: HttpStatus.CREATED,
      });
    } catch (error) {
      return HTTPResponse({
        data: error,
        message: 'Erro ao criar tarefa',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
