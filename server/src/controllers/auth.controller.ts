import { ApiPath } from 'shared/common/enums/enums';
import { Body, Controller, Post } from 'src/common/decorators/decorators';
import { AuthApi } from 'src/common/enums/enums';
import { SignInRequestDto, SignUpRequestDto } from 'src/common/types/types';
import { AuthService } from 'src/services/auth.service';

@Controller(ApiPath.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(AuthApi.SIGN_UP)
  signUp(@Body() userDto: SignUpRequestDto) {
    return this.authService.signUp(userDto);
  }

  @Post(AuthApi.SIGN_IN)
  signIn(@Body() userDto: SignInRequestDto) {
    return this.authService.signIn(userDto);
  }
}
