import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create.dto';
import { FindAllUsersDto } from './dtos/findAll.dto';
import { UserUseCases } from './use-cases';

@Controller('/users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get()
  @UsePipes(ValidationPipe)
  async findAll(@Query() query: FindAllUsersDto) {
    return this.userUseCases.findAllUsersUseCase.execute(query);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() body: CreateUserDto) {
    return this.userUseCases.createUsersUseCase.execute(body);
  }
}
