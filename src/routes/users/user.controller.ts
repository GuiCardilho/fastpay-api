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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create.dto';
import { DeleteByIdDto } from './dtos/delete.dto';
import { FindAllUsersDto } from './dtos/findAll.dto';
import { FindByIdDto } from './dtos/findById';
import { LoginUserDto } from './dtos/login.dto';
import { UpdateByIdDto, UpdateUserDto } from './dtos/update.dto';
import { UserUseCases } from './use-cases';

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
  async findAll(@Query() query: FindAllUsersDto) {
    return this.userUseCases.findAllUsersUseCase.execute(query);
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  @UseGuards(GuardVerifyLoginUser)
  @ApiParam({ name: 'id', required: true, type: 'string' })
  async findById(@Param() query: FindByIdDto) {
    return this.userUseCases.findByIdUseCase.execute(query);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() body: CreateUserDto) {
    return this.userUseCases.createUsersUseCase.execute(body);
  }

  @Post('/auth')
  @UsePipes(ValidationPipe)
  async login(@Body() body: LoginUserDto) {
    return this.userUseCases.loginUseCase.execute(body);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @ApiBearerAuth()
  @UseGuards(GuardVerifyLoginUser)
  async update(@Body() body: UpdateUserDto, @Param() id: UpdateByIdDto) {
    return this.userUseCases.updateUsersUseCase.execute(body, id);
  }

  @Delete('/:id')
  @UsePipes(ValidationPipe)
  @ApiParam({ name: 'id', required: true, type: 'string' })
  @ApiBearerAuth()
  @UseGuards(GuardVerifyLoginUser)
  async delete(@Param() id: DeleteByIdDto) {
    return this.userUseCases.deleteUsersUseCase.execute(id);
  }
}
