import { Injectable } from '@nestjs/common';

import { CreateUsersUseCase } from './create.usecase';

import { DeleteUsersUseCase } from './delete.usecase';
import { FindAllUsersUseCase } from './findAll.usecase';
import { FindByIdUseCase } from './findById.usecase';
import { LoginUseCase } from './login.usecase';
import { ResetPasswordUsersUseCase } from './resetPassword.usecase';
import { ResetPasswordUsersUpdateUseCase } from './resetPasswordUpdate.usecase';
import { UpdateUsersUseCase } from './update.usecase';

@Injectable()
export class UserUseCases {
  constructor(
    public readonly findAllUsersUseCase: FindAllUsersUseCase,
    public readonly createUsersUseCase: CreateUsersUseCase,
    public readonly loginUseCase: LoginUseCase,
    public readonly findByIdUseCase: FindByIdUseCase,
    public readonly updateUsersUseCase: UpdateUsersUseCase,
    public readonly deleteUsersUseCase: DeleteUsersUseCase,
    public readonly resetPasswordUsersUseCase: ResetPasswordUsersUseCase,
    public readonly resetPasswordUsersUpdateUseCase: ResetPasswordUsersUpdateUseCase,
  ) {}
}
