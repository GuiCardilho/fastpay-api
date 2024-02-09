import { HTTPResponse } from '@/utils/response';
import { HttpStatus, Injectable } from '@nestjs/common';
import { FindAllUsersDto } from '../dtos/findAll.dto';
import { IPropsFindAll, UserService } from '../user.service';

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(query: FindAllUsersDto) {
    const { page, limit, order, orderBy, select, filter } = query;
    const selectParsed = select?.length ? JSON.parse(select) : [];

    const selectObject = selectParsed.reduce((acc, item) => {
      acc[item] = true;
      return acc;
    }, {});

    const payload: IPropsFindAll = {
      take: Number(limit) || 10,
      skip: Number((page - 1) * limit || 0),
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

    try {
      const response = await this.userService.findAll(payload);

      return HTTPResponse({
        data: response,
        message: 'Usuários encontrados com sucesso',
        status: HttpStatus.OK,
      });
    } catch (error) {
      return HTTPResponse({
        data: error,
        message: 'Erro ao buscar usuários',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
