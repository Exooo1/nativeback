import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileEntity } from '../../entities/auth.entity';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TokenService } from '../../guard/auth/tokens.service';
import { TokensModule } from '../../guard/auth/tokens.module';

@Module({
  imports: [
    TokensModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          transport: {
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
              user: config.get<string>('LOGIN'),
              pass: config.get<string>('PASSWORD'),
            },
          },
          defaults: {
            from: 'vlasmaskalenchik1998@gmail.com',
          },
        };
      },
    }),
    SequelizeModule.forFeature([ProfileEntity]),
  ],
  providers: [AuthService, ConfigService, TokenService],
  controllers: [AuthController],
  exports: [SequelizeModule],
})
export class AuthModule {}
