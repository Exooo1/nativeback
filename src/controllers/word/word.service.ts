import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WordEntity } from '../../entities/word.entity';
import { ProfileEntity } from '../../entities/auth.entity';
import { AddWordDTO } from '../../dto/word.dto';
import { whereOptions } from '../../utils/responseHelper';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(WordEntity)
    private wordEntity: typeof WordEntity,
    @InjectModel(ProfileEntity)
    private profileEntity: typeof ProfileEntity,
  ) {}

  async addWord(data: AddWordDTO, user: number) {
    try {
      const { word } = data;
      const whereWord = whereOptions({ word });
      const whereProfile = whereOptions({ id: user });
      const theWord = await this.wordEntity.findOne(whereWord);
      const profile = await this.profileEntity.findOne(whereProfile);
      if (!profile) throw new HttpException('not found profile', HttpStatus.NOT_FOUND);
      if (theWord) throw new HttpException('The word is your base', HttpStatus.FORBIDDEN);
      data.profileId = profile.id;
      await this.wordEntity.create({ ...data });
      return {};
    } catch (err) {
      const error = err as HttpException;
      let status: number;
      if (typeof error.getStatus === 'function') status = error.getStatus();
      if (status) throw new HttpException(error.message, status);
      else throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
