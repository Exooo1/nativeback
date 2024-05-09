import { Module } from '@nestjs/common';
import { WordController } from './word.controller';
import { WordService } from './word.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WordEntity } from '../../entities/word.entity';
import { ProfileEntity } from '../../entities/auth.entity';

@Module({
  imports: [SequelizeModule.forFeature([WordEntity, ProfileEntity])],
  providers: [WordService],
  controllers: [WordController],
  exports: [SequelizeModule],
})
export class WordModule {}
