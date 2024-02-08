import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const helath: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    healthController = helath.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return status 200 and message field', () => {
      const expectedResponse = {
        message: 'Service is up and running!',
        status: HttpStatus.OK,
      };

      const actualResponse = healthController.getHealthStatus();

      expect(actualResponse).toEqual(expectedResponse);
    });
  });
});
