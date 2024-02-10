import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({
    message: 'Email é obrigatório',
  })
  @IsEmail(
    {},
    {
      message: 'Tipo de email inválido',
    },
  )
  @ApiProperty({
    example: 'teste@teste.com',
    description: 'Email do usuário',
  })
  email: string;
}
