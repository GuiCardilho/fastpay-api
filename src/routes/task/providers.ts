import { PrismaService } from '@/database/prisma.service';
import { TaskService } from './task.service';
import { TaskUseCases } from './use-cases';
import { CreateTasksUseCase } from './use-cases/create.usecase';
import { DeleteTasksUseCase } from './use-cases/delete.usecase';
import { FindAllTasksUseCase } from './use-cases/findAll.usecase';
import { FindByIdUseCase } from './use-cases/findById.usecase';
import { UpdateTasksUseCase } from './use-cases/update.usecase';

export const TaskProvders = [
  TaskService,
  PrismaService,
  TaskUseCases,
  FindByIdUseCase,
  CreateTasksUseCase,
  DeleteTasksUseCase,
  FindAllTasksUseCase,
  UpdateTasksUseCase,
];
