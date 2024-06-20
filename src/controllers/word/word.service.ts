import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WordEntity } from '../../entities/word.entity';
import { AddWordDTO, EditWordDTO, GetWordsDTO } from '../../dto/word.dto';
import { responseHelper, TResponse, whereOptions } from '../../utils/responseHelper';
import { Op } from 'sequelize';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(WordEntity)
    private wordEntity: typeof WordEntity,
  ) {}

  async addWord(data: AddWordDTO, userId: string): Promise<TResponse<WordEntity>> {
    try {
      const { word, translate } = data;
      const upperCaseWord = word[0].toUpperCase() + word.slice(1).toLowerCase();
      const where = whereOptions({ word: upperCaseWord, userId });
      const isSameWord = await this.wordEntity.findOne(where);
      if (isSameWord)
        throw new HttpException('This word is already in your vocabulary', HttpStatus.FORBIDDEN);
      data.userId = userId;
      data.word = upperCaseWord;
      data.translate = translate;
      return responseHelper(
        `The "${data.word}" added in your vocabulary`,
        await this.wordEntity.create({ ...data }),
      );
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

  async getWords(data: GetWordsDTO, userId: string): Promise<TResponse<WordEntity[]>> {
    try {
      const { offset, limit } = data;
      const where = whereOptions({ userId }, true, limit * offset, null, ['userId']);
      const words = await this.wordEntity.findAll(where);
      return responseHelper(`The words are received`, words);
    } catch (err) {
      const error = err as HttpException;
      let status: number;
      if (typeof error.getStatus === 'function') status = error.getStatus();
      if (status) throw new HttpException(error.message, status);
      else throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findWord(word: string, userId: string): Promise<TResponse<WordEntity>> {
    try {
      if (!word.length) throw new HttpException(`The word cannot be empty`, HttpStatus.NOT_FOUND);
      const where = whereOptions({ userId, word: { [Op.iLike]: `${word}%` } }, true, null, null, ['userId']);
      const userWord = await this.wordEntity.findOne(where);
      if (!userWord) throw new HttpException(`The word was not found`, HttpStatus.NOT_FOUND);
      return responseHelper(`The word is found`, userWord);
    } catch (err) {
      const error = err as HttpException;
      let status: number;
      if (typeof error.getStatus === 'function') status = error.getStatus();
      if (status) throw new HttpException(error.message, status);
      else throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editWord(data: EditWordDTO, userId: string): Promise<TResponse<null>> {
    try {
      const { word, translate, examples, id } = data;
      const upperCaseWord = word[0].toUpperCase() + word.slice(1).toLowerCase();
      const whereDuplicate = whereOptions({ word: upperCaseWord, userId });
      const duplicate = await this.wordEntity.findOne(whereDuplicate);
      if (duplicate) throw new HttpException('This word is already in your vocabulary', HttpStatus.FORBIDDEN);
      const where = whereOptions({ id, userId });
      const theWord = await this.wordEntity.findOne(where);
      theWord.word = word;
      theWord.translate = translate;
      theWord.examples = examples?.length ? examples : null;
      await theWord.save();
      return responseHelper('The word has been edited', null);
    } catch (err) {
      const error = err as HttpException;
      let status: number;
      if (typeof error.getStatus === 'function') status = error.getStatus();
      if (status) throw new HttpException(error.message, status);
      else throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
