import { Module } from '@nestjs/common';
import { WordController } from './word.controller';
import { WordService } from './word.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WordEntity } from '../../entities/word.entity';
import { UserEntity } from '../../entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([WordEntity, UserEntity])],
  providers: [WordService],
  controllers: [WordController],
  exports: [SequelizeModule],
})
export class WordModule {}
