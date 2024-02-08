import { User } from '@prisma/client';
import { IPagination } from '@type/pagination';
import {
  IsEnum,
  IsOptional,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class VerifySelectOptions implements ValidatorConstraintInterface {
  public async validate(select: string) {
    const allowedSelects: IPagination<User>['select'] = [
      'id',
      'name',
      'email',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    const selectOptions = select?.length
      ? (JSON.parse(select) as IPagination<User>['select'])
      : [];

    for (const option of selectOptions) {
      if (!allowedSelects.includes(option)) {
        return false;
      }
    }

    return true;
  }
}

export class FindAllUsersDto implements Omit<IPagination<User>, 'select'> {
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  order: 'ASC' | 'DESC';

  @IsOptional()
  orderBy: keyof User;

  @IsOptional()
  filter: string;

  @IsOptional()
  @Validate(VerifySelectOptions, {
    message: 'Invalid select options',
  })
  select: string;

  @IsOptional()
  @IsEnum(['active', 'inactive', 'all'])
  status?: 'active' | 'inactive' | 'all';
}
