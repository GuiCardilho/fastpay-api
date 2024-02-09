import { Module } from '@nestjs/common';
import { TaskProvders } from './providers';
import { TaskController } from './task.controller';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: TaskProvders,
})
export class TaskModule {}
