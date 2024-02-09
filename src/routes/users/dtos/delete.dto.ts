import { IsNotEmpty } from 'class-validator';

export class DeleteByIdDto {
  @IsNotEmpty({
    message: 'Id é obrigatório',
  })
  id: number;
}
