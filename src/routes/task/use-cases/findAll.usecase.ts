import { HTTPResponse } from '@/utils/response';
import { HttpStatus, Injectable } from '@nestjs/common';
import { FindAllTasksDto } from '../dtos/findAll.dto';
import { IUser } from '../task.controller';
import { IPropsFindAll, TaskService } from '../task.service';

@Injectable()
export class FindAllTasksUseCase {
  constructor(private readonly taskService: TaskService) {}

  async execute(query: FindAllTasksDto, user: IUser) {
    const { page, limit, order, orderBy, select, filter } = query;

    const selectParsed = select?.length ? JSON.parse(select) : [];

    const selectObject = selectParsed.reduce((acc, item) => {
      acc[item] = true;
      return acc;
    }, {});

    const payload: IPropsFindAll = {
      take: Number(limit || 10),
      skip: Number((page - 1) * limit || 0),
      orderBy: orderBy || 'id',
      order: order || 'DESC',
      where: {
        AND: [{ userId: Number(user.id) }],
      },
    };

    if (selectParsed.length) {
      payload.select = selectObject;
    }

    if (filter) {
      payload.where.AND.push({
        OR: [
          {
            title: {
              contains: filter,
            },
          },
          {
            description: {
              contains: filter,
            },
          },
        ],
      });
    }
    try {
      const response = await this.taskService.findAll(payload);

      return HTTPResponse({
        data: response,
        message: 'Tarefas encontradas com sucesso',
        status: HttpStatus.OK,
      });
    } catch (error) {
      return HTTPResponse({
        data: error,
        message: 'Erro ao buscar tarefas',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
