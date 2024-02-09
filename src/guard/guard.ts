import { compareJWT } from '@/utils/jwtMethods';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class GuardVerifyLoginUser implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    if (!req.headers.authorization) {
      return false;
    }

    const bearer = req.headers.authorization.split(' ')[1];

    try {
      const jwt = compareJWT(bearer);

      if (!jwt) {
        return false;
      }

      res.user = jwt;
    } catch (error) {
      return false;
    }

    return true;
  }
}
