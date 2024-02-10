import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

export interface IPropsFindAll {
  take: number;
  skip: number;
  orderBy: string;
  order: 'ASC' | 'DESC';
  where?: {
    AND: Prisma.UserWhereInput[];
  };
  select?: Prisma.UserSelect;
}

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll({ take, skip, orderBy, where, order, select }: IPropsFindAll) {
    const users = await this.prismaService.user.findMany({
      select: select
        ? select
        : {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
      take,
      skip,
      orderBy: {
        [orderBy || 'id']: (order?.toLowerCase() as Prisma.SortOrder) || 'desc',
      },
      where,
    });

    const total = await this.prismaService.user.count({ where });

    const response = {
      users,
      totalItems: total,
      totalPage: Math.ceil(total / take),
      limit: take,
      page: Math.ceil(skip / take) + 1,
    };

    return response;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await this.prismaService.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findByPhone(phone: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        phone,
      },
    });

    return user;
  }

  async findById(id: number) {
    const user = await this.prismaService.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
      where: {
        id: Number(id),
      },
    });

    return user;
  }

  async update(data: Prisma.UserUpdateInput, id: number) {
    const user = await this.prismaService.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    });

    return user;
  }

  async delete(id: number) {
    const user = await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });

    return user;
  }

  async updatePassword(email: string, password: string) {
    const user = await this.prismaService.user.update({
      where: {
        email,
      },
      data: {
        password,
      },
    });

    return user;
  }
}
