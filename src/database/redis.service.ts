import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  constructor() {
    super({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    });

    super.on('error', (err) => {
      console.log('Error Redis: ', err);
    });

    super.on('connect', () => {
      console.log('Redis connected');
    });
  }
}
