import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule],
  providers: [JwtStrategy],
  exports: [JwtModule],
})
export class TokensModule {}
