import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from './controllers/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProfileModule } from './controllers/profile/profile.module';
import { WordEntity } from './entities/word.entity';
import { WordModule } from './controllers/word/word.module';

@Module({
  imports: [
    WordModule,
    ProfileModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        models: [UserEntity, WordEntity],
        autoLoadModels: true,
        synchronize: true,
        logQueryParameters: false,
        logging: false,
        timezone: 'Europe/Minsk',
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
