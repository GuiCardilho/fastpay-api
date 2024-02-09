import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto
  implements
    Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'password'>
{
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
    message: 'Nome é obrigatório',
  })
  @ApiProperty({
    example: 'Teste',
    description: 'Nome do usuário',
  })
  name: string;

  @IsNotEmpty({
    message: 'Telefone é obrigatório',
  })
  @IsPhoneNumber('BR', {
    message: 'Tipo de telefone inválido',
  })
  @ApiProperty({
    example: '123456789',
    description: 'Telefone do usuário',
  })
  phone: string;
}

export class UpdateByIdDto {
  @IsNotEmpty({
    message: 'Id é obrigatório',
  })
  id: number;
}
