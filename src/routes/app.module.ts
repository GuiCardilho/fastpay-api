import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [HealthModule, UserModule, TaskModule],
})
export class AppModule {}
