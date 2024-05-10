import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from '../../entities/user.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [SequelizeModule.forFeature([UserEntity])],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [SequelizeModule],
})
export class ProfileModule {}
