import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Injectable } from 'src/common/decorators/decorators';
import { ENV, ExceptionsMessages, Grants } from 'src/common/enums/enums';
import {
  ForbiddenException,
  UnauthorizedException,
} from 'src/common/exceptions/excpetions';
import { UserTokenData } from 'src/common/types/types';
import { JwtService } from 'src/services/services';

const {
  JWT: { JWT_PRIVATE_KEY },
} = ENV;

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: ExceptionsMessages.USER_IS_UNUTHORIZED,
        });
      }

      const userData: UserTokenData = this.jwtService.verify<UserTokenData>(
        token,
        {
          secret: JWT_PRIVATE_KEY,
        },
      );

      if (!(userData.grant === Grants.ADMIN)) {
        throw new ForbiddenException({
          message: ExceptionsMessages.YOU_MUST_BE_ADMIN_TO_ACCESS_THIS_RESOURCE,
        });
      }

      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: ExceptionsMessages.USER_IS_UNUTHORIZED,
      });
    }
  }
}
