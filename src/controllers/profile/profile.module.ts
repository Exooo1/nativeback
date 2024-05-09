import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileEntity } from '../../entities/auth.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [SequelizeModule.forFeature([ProfileEntity])],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [SequelizeModule],
})
export class ProfileModule {}
