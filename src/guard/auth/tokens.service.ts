import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuth, TTokenResponse } from '../../types/auth';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  createTokens(user: IAuth): TTokenResponse {
    try {
      delete user.password;
      delete user.email;
      const accessToken = this.jwtService.sign(user, {
        expiresIn: this.config.get('JWT_EXPIRE_ACCESS'),
        secret: this.config.get('JWT_SECRET_ACCESS'),
      });
      const refreshToken = this.jwtService.sign(user, {
        expiresIn: this.config.get('JWT_EXPIRE_REFRESH'),
        secret: this.config.get('JWT_SECRET_REFRESH'),
      });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
