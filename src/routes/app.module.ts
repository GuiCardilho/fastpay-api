import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [HealthModule, UserModule],
})
export class AppModule {}
