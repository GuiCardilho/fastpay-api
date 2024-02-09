import { IsNotEmpty } from 'class-validator';

export class FindByIdDto {
  @IsNotEmpty({
    message: 'Id é obrigatório',
  })
  id: number;
}
