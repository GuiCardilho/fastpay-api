import { ApiProperty } from '@nestjs/swagger';
import { Task } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class UpdateTaskDto
  implements
    Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'userId'>
{
  @IsNotEmpty({
    message: 'Nome é obrigatório',
  })
  @ApiProperty({
    example: 'Teste',
    description: 'Nome da tarefa',
  })
  title: string;

  @IsNotEmpty({
    message: 'Descrição é obrigatória',
  })
  @ApiProperty({
    example: 'Teste',
    description: 'Descrição da tarefa',
  })
  description: string;

  @IsNotEmpty({
    message: 'Data é obrigatória',
  })
  @ApiProperty({
    example: '2021-12-31',
    description: 'Data da tarefa',
  })
  date: Date;
}

export class UpdateByIdDto {
  @IsNotEmpty({
    message: 'Id é obrigatório',
  })
  id: number;
}
