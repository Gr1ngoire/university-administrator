import { JwtAuthGuard } from 'src/guards/guards';
import { ApiPath } from 'shared/common/enums/enums';
import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from 'src/common/decorators/decorators';
import { AuthApi } from 'src/common/enums/enums';
import {
  UserSignInValidationDto,
  UserSignUpValidationDto,
} from 'src/common/validation-dtos/validation-dtos';
import { AuthService } from 'src/services/auth.service';

@Controller(ApiPath.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get(AuthApi.CURRENT_USER)
  currentUser(@Headers('authorization') authHeader: string) {
    return this.authService.getCurrentUser(authHeader);
  }

  @Post(AuthApi.SIGN_UP)
  signUp(@Body() userDto: UserSignUpValidationDto) {
    return this.authService.signUp(userDto);
  }

  @Post(AuthApi.SIGN_IN)
  signIn(@Body() userDto: UserSignInValidationDto) {
    return this.authService.signIn(userDto);
  }
}
