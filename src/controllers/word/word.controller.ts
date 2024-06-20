import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { WordService } from './word.service';
import { AddWordDTO, EditWordDTO, GetWordsDTO } from '../../dto/word.dto';
import { User } from '../../decorators/user.decorator';
import { JwtAuthGuard } from '../../guard/auth/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post('create')
  addWord(@Body() data: AddWordDTO, @User('id') id: string) {
    return this.wordService.addWord(data, id);
  }

  @Get()
  getWords(@Query() data: GetWordsDTO, @User('id') id: string) {
    return this.wordService.getWords(data, id);
  }

  @Get('find')
  findWord(@Query('word') word: string, @User('id') id: string) {
    return this.wordService.findWord(word, id);
  }

  @Post('edit')
  editWord(@Body() data: EditWordDTO, @User('id') id: string) {
    return this.wordService.editWord(data, id);
  }
}
