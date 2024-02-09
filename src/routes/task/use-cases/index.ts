import { Injectable } from '@nestjs/common';
import { CreateTasksUseCase } from './create.usecase';
import { DeleteTasksUseCase } from './delete.usecase';
import { FindAllTasksUseCase } from './findAll.usecase';
import { FindByIdUseCase } from './findById.usecase';
import { UpdateTasksUseCase } from './update.usecase';

@Injectable()
export class TaskUseCases {
  constructor(
    public readonly findAllTasksUseCase: FindAllTasksUseCase,
    public readonly createTasksUseCase: CreateTasksUseCase,
    public readonly findByIdUseCase: FindByIdUseCase,
    public readonly updateTasksUseCase: UpdateTasksUseCase,
    public readonly deleteTasksUseCase: DeleteTasksUseCase,
  ) {}
}
