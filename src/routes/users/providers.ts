import { PrismaService } from '@/database/prisma.service';
import { UserService } from './user.service';

import { RedisService } from '@/database/redis.service';
import { UserUseCases } from './use-cases';
import { CreateUsersUseCase } from './use-cases/create.usecase';
import { DeleteUsersUseCase } from './use-cases/delete.usecase';
import { FindAllUsersUseCase } from './use-cases/findAll.usecase';
import { FindByIdUseCase } from './use-cases/findById.usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { ResetPasswordUsersUseCase } from './use-cases/resetPassword.usecase';
import { ResetPasswordUsersUpdateUseCase } from './use-cases/resetPasswordUpdate.usecase';
import { UpdateUsersUseCase } from './use-cases/update.usecase';

export const UserProvders = [
  UserService,
  PrismaService,
  RedisService,
  UserUseCases,
  FindByIdUseCase,
  CreateUsersUseCase,
  DeleteUsersUseCase,
  FindAllUsersUseCase,
  LoginUseCase,
  UpdateUsersUseCase,
  ResetPasswordUsersUseCase,
  ResetPasswordUsersUpdateUseCase,
];
