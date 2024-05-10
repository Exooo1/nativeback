import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, SignUpDTO } from '../../dto/auth.dto';
import { EmptyResponse } from '../../dto/common.dto';
import { TResponse } from '../../utils/responseHelper';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }

  @Post('signup')
  signUp(@Body() data: SignUpDTO): Promise<EmptyResponse> {
    return this.authService.signUp(data);
  }

  @Get('verify/:id')
  verify(@Param('id') id: string): Promise<TResponse<null>> {
    return this.authService.verifyEmail(id);
  }
}
