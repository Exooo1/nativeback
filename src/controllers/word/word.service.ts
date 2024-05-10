import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WordEntity } from '../../entities/word.entity';
import { AddWordDTO } from '../../dto/word.dto';
import { responseHelper, whereOptions } from '../../utils/responseHelper';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(WordEntity)
    private wordEntity: typeof WordEntity,
  ) {}

  async addWord(data: AddWordDTO, userId: number) {
    try {
      const { word } = data;
      const where = whereOptions({ word });
      const isSameWord = await this.wordEntity.findOne(where);
      if (isSameWord)
        throw new HttpException('This word is already in your vocabulary', HttpStatus.FORBIDDEN);
      data.userId = 1;
      return responseHelper('Word added', await this.wordEntity.create({ ...data }));
    } catch (err) {
      const error = err as HttpException;
      if (error.message.includes('words_userId_fkey'))
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      let status: number;
      if (typeof error.getStatus === 'function') status = error.getStatus();
      if (status) throw new HttpException(error.message, status);
      else throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
