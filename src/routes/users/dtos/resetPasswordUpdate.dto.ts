import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordUpdateDto {
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

  @IsNotEmpty({
    message: 'Senha é obrigatória',
  })
  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  password: string;

  @IsNotEmpty({
    message: 'Código é obrigatório',
  })
  @ApiProperty({
    example: '123456',
    description: 'Código de verificação',
  })
  code: string;
}
