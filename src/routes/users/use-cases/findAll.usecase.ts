import { HTTPResponse } from '@/utils/response';
import { HttpStatus, Injectable } from '@nestjs/common';
import { FindAllUsersDto } from '../dtos/findAll.dto';
import { IPropsFindAll, UserService } from '../user.service';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(query: FindAllUsersDto) {
    const { page, limit, order, orderBy, select, filter, status } = query;
    const selectParsed = select?.length ? JSON.parse(select) : [];

    const selectObject = selectParsed.reduce((acc, item) => {
      acc[item] = true;
      return acc;
    }, {});

    const payload: IPropsFindAll = {
      take: limit || 10,
      skip: (page - 1) * limit || 0,
      orderBy: orderBy || 'id',
      order: order || 'DESC',
      where: {
        AND: [],
      },
    };

    if (selectParsed.length) {
      payload.select = selectObject;
    }

    if (filter) {
      payload.where.AND.push({
        OR: [
          {
            name: {
              contains: filter,
            },
          },
          {
            email: {
              contains: filter,
            },
          },
          {
            phone: {
              contains: filter,
            },
          },
        ],
      });
    }

    if (status) {
      if (status === 'active' || status === 'inactive') {
        payload.where.AND.push({
          deletedAt: status === 'active' ? null : { not: null },
        });
      }
    }

    const response = await this.userService.findAll(payload);

    return HTTPResponse({
      data: response,
      message: 'Users found successfully',
      status: HttpStatus.OK,
    });
  }
}
