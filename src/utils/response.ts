import { HttpStatus } from '@nestjs/common';

export interface IResponse {
  data: any;
  message: string;
  status: HttpStatus;
  error?: string;
}

export const HTTPResponse = (payload: IResponse): IResponse => {
  return payload;
};
