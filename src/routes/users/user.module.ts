import { Module } from '@nestjs/common';
import { UserProvders } from './providers';
import { UserController } from './user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: UserProvders,
})
export class UserModule {}
