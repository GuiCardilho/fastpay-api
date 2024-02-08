import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getStatus() {
    return {
      message: 'Service is up and running!',
      status: HttpStatus.OK,
    };
  }
}
