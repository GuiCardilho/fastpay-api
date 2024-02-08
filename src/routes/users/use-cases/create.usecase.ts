import { capitalize } from '@/utils/genericFunctions';
import { HTTPResponse } from '@/utils/response';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from '../dtos/create.dto';
import { UserService } from '../user.service';

@Injectable()
export class CreateUsersUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(body: CreateUserDto) {
    const { email, password, phone, name } = body;

    const verifyEmail = await this.userService.findByEmail(email);
    if (verifyEmail) {
      throw new HttpException('Email already exists', 400);
    }

    const verifyPhone = await this.userService.findByPhone(phone);
    if (verifyPhone) {
      throw new HttpException('Phone already exists', 400);
    }

    const payload: Prisma.UserCreateInput = {
      email: email.toLowerCase().trim(),
      password,
      phone: phone.replace(/\D/g, ''),
      name: capitalize(name),
    };
    const response = await this.userService.create(payload);

    return HTTPResponse({
      data: response,
      message: 'User created successfully',
      status: HttpStatus.CREATED,
    });
  }
}