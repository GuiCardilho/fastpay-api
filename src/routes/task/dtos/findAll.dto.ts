import { Task } from '@prisma/client';
import { IPagination } from '@type/pagination';
import {
  IsOptional,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class VerifySelectOptions implements ValidatorConstraintInterface {
  public async validate(select: string) {
    const allowedSelects: IPagination<Task>['select'] = [
      'id',
      'title',
      'description',
      'date',
      'userId',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    const selectOptions = select?.length
      ? (JSON.parse(select) as IPagination<Task>['select'])
      : [];

    for (const option of selectOptions) {
      if (!allowedSelects.includes(option)) {
        return false;
      }
    }

    return true;
  }
}

export class FindAllTasksDto implements Omit<IPagination<Task>, 'select'> {
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  order: 'ASC' | 'DESC';

  @IsOptional()
  orderBy: keyof Task;

  @IsOptional()
  filter: string;

  @IsOptional()
  @Validate(VerifySelectOptions, {
    message: 'Opção de select inválida',
  })
  select: string;
}
