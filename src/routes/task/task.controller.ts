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
import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { CreateTaskDto } from './dtos/create.dto';
import { DeleteByIdDto } from './dtos/delete.dto';
import { FindAllTasksDto } from './dtos/findAll.dto';
import { FindByIdDto } from './dtos/findById';
import { UpdateByIdDto, UpdateTaskDto } from './dtos/update.dto';
import { TaskUseCases } from './use-cases';

export interface IUser extends JwtPayload {
  id: string;
  email: string;
  name: string;
}

export interface IResponse extends Response {
  user: IUser;
}

@ApiTags('tasks')
@Controller('/tasks')
export class TaskController {
  constructor(private readonly taskUseCases: TaskUseCases) {}

  @Get()
  @UsePipes(ValidationPipe)
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  @ApiQuery({ name: 'order', required: false, enum: ['ASC', 'DESC'] })
  @ApiQuery({ name: 'orderBy', required: false, type: 'string' })
  @ApiQuery({ name: 'filter', required: false, type: 'string' })
  @ApiQuery({ name: 'select', required: false, type: 'string' })
  @ApiBearerAuth()
  @UseGuards(GuardVerifyLoginUser)
  async findAll(@Query() query: FindAllTasksDto, @Res() res: IResponse) {
    const response = await this.taskUseCases.findAllTasksUseCase.execute(
      query,
      res.user,
    );
    return res.status(response.status).json(response.data);
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  @UseGuards(GuardVerifyLoginUser)
  @ApiParam({ name: 'id', required: true, type: 'string' })
  async findById(@Param() query: FindByIdDto, @Res() res: IResponse) {
    const response = await this.taskUseCases.findByIdUseCase.execute(
      query,
      res.user,
    );

    return res.status(response.status).json(response.data);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  @UseGuards(GuardVerifyLoginUser)
  async create(@Body() body: CreateTaskDto, @Res() res: IResponse) {
    const response = await this.taskUseCases.createTasksUseCase.execute(
      body,
      res.user,
    );
    return res.status(response.status).json(response.data);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @ApiBearerAuth()
  @UseGuards(GuardVerifyLoginUser)
  async update(
    @Body() body: UpdateTaskDto,
    @Param() id: UpdateByIdDto,
    @Res() res: IResponse,
  ) {
    const response = await this.taskUseCases.updateTasksUseCase.execute(
      body,
      id,
      res.user,
    );
    return res.status(response.status).json(response.data);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @ApiBearerAuth()
  @UseGuards(GuardVerifyLoginUser)
  async delete(@Param() id: DeleteByIdDto, @Res() res: IResponse) {
    const response = await this.taskUseCases.deleteTasksUseCase.execute(
      id,
      res.user,
    );
    return res.status(response.status).json(response.data);
  }
}
