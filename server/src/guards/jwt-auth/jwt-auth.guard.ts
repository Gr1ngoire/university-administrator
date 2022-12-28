import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Injectable } from 'src/common/decorators/decorators';
import { ENV, ExceptionsMessages } from 'src/common/enums/enums';
import { UnauthorizedException } from 'src/common/exceptions/excpetions';
import { JwtService } from 'src/services/services';

const {
  JWT: { JWT_PRIVATE_KEY },
} = ENV;

@Injectable()
export class JwtAuthGuard implements CanActivate {
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
          message: ExceptionsMessages.USER_IS_UNAUTHORIZED,
        });
      }

      this.jwtService.verify(token, { secret: JWT_PRIVATE_KEY });

      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: ExceptionsMessages.USER_IS_UNAUTHORIZED,
      });
    }
  }
}
