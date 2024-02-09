import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

export interface IPropsFindAll {
  take: number;
  skip: number;
  orderBy: string;
  order: 'ASC' | 'DESC';
  where?: {
    AND: Prisma.TaskWhereInput[];
  };
  select?: Prisma.TaskSelect;
}

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({ take, skip, orderBy, where, order, select }: IPropsFindAll) {
    const tasks = await this.prismaService.task.findMany({
      select,
      take,
      skip,
      orderBy: {
        [orderBy || 'id']: (order?.toLowerCase() as Prisma.SortOrder) || 'desc',
      },
      where,
    });

    const total = await this.prismaService.task.count({ where });

    const response = {
      tasks,
      totalItems: total,
      totalPage: Math.ceil(total / take),
      limit: take,
      page: Math.ceil(skip / take) + 1,
    };

    return response;
  }

  async create(data: Prisma.TaskCreateInput) {
    const task = await this.prismaService.task.create({
      data,
    });

    return task;
  }

  async findById(id: number, userId: number) {
    console.log('id', id);
    console.log('userId', userId);

    const task = await this.prismaService.task.findUnique({
      where: {
        id: Number(id),
        userId,
      },
    });

    return task;
  }

  async update(data: Prisma.TaskUpdateInput, id: number, userId: number) {
    const task = await this.prismaService.task.update({
      where: {
        id: Number(id),
        userId,
      },
      data,
    });

    return task;
  }

  async delete(id: number, userId: number) {
    const task = await this.prismaService.task.delete({
      where: {
        id: Number(id),
        userId,
      },
    });

    return task;
  }
}
