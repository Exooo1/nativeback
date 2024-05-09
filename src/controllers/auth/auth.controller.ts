import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, SignUpDTO } from '../../dto/auth.dto';
import { EmptyResponse } from '../../dto/common.dto';
import { JwtAuthGuard } from '../../guard/auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }

  @Post('signup')
  signUp(@Body() data: SignUpDTO): Promise<EmptyResponse> {
    return this.authService.signUp(data);
  }

  @Get('verify/:id')
  verify(@Param('id') id: string): any {
    return this.authService.verifyEmail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@Req() req): any {
    return 'sss';
  }
}
