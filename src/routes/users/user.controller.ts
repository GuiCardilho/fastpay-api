import { GuardVerifyLoginUser } from '@/guard/guard';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { IUser } from '@routes/task/task.controller';
import { Response } from 'express';
import { CreateUserDto } from './dtos/create.dto';
import { DeleteByIdDto } from './dtos/delete.dto';
import { FindAllUsersDto } from './dtos/findAll.dto';
import { FindByIdDto } from './dtos/findById';
import { LoginUserDto } from './dtos/login.dto';
import { UpdateByIdDto, UpdateUserDto } from './dtos/update.dto';
import { UserUseCases } from './use-cases';

interface IResponse extends Response {
  user: IUser;
}
@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get()
  @UsePipes(ValidationPipe)
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiQuery({ name: 'order', required: false, enum: ['ASC', 'DESC'] })
  @ApiQuery({ name: 'orderBy', required: false, type: 'string' })
  @ApiQuery({ name: 'filter', required: false, type: 'string' })
  @ApiQuery({ name: 'select', required: false, type: 'string' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['active', 'inactive', 'all'],
  })
  @ApiBearerAuth()
  @UseGuards(GuardVerifyLoginUser)
  async findAll(@Query() query: FindAllUsersDto, @Res() res: Response) {
    const response = await this.userUseCases.findAllUsersUseCase.execute(query);

    return res.status(response.status).json(response);
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  @UseGuards(GuardVerifyLoginUser)
  @ApiParam({ name: 'id', required: true, type: 'string' })
  async findById(@Param() query: FindByIdDto, @Res() res: Response) {
    const response = await this.userUseCases.findByIdUseCase.execute(query);
    return res.status(response.status).json(response);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() body: CreateUserDto, @Res() res: Response) {
    const response = await this.userUseCases.createUsersUseCase.execute(body);
    return res.status(response.status).json(response);
  }

  @Post('/auth')
  @UsePipes(ValidationPipe)
  async login(@Body() body: LoginUserDto, @Res() res: Response) {
    const response = await this.userUseCases.loginUseCase.execute(body);
    return res.status(response.status).json(response);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @ApiBearerAuth()
  @UseGuards(GuardVerifyLoginUser)
  async update(
    @Body() body: UpdateUserDto,
    @Param() id: UpdateByIdDto,
    @Res() res: Response,
  ) {
    const response = await this.userUseCases.updateUsersUseCase.execute(
      body,
      id,
    );
    return res.status(response.status).json(response);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  @ApiParam({ name: 'id', required: true })
  @ApiBearerAuth()
  @UseGuards(GuardVerifyLoginUser)
  async delete(@Param() id: DeleteByIdDto, @Res() res: IResponse) {
    const response = await this.userUseCases.deleteUsersUseCase.execute(
      id,
      res.user,
    );
    return res.status(response.status).json(response);
  }
}
