import { PrismaService } from '@/database/prisma.service';
import { UserUseCases } from './use-cases';
import { CreateUsersUseCase } from './use-cases/create.usecase';
import { FindAllUsersUseCase } from './use-cases/findAll.usecase';
import { UserService } from './user.service';

export const UserProvders = [
  UserService,
  PrismaService,
  UserUseCases,
  FindAllUsersUseCase,
  CreateUsersUseCase,
];
