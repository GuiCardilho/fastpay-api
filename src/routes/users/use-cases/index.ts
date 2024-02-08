import { Injectable } from '@nestjs/common';
import { CreateUsersUseCase } from './create.usecase';
import { FindAllUsersUseCase } from './findAll.usecase';

@Injectable()
export class UserUseCases {
  constructor(
    public readonly findAllUsersUseCase: FindAllUsersUseCase,
    public readonly createUsersUseCase: CreateUsersUseCase,
  ) {}
}
