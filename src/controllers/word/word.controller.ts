import { Body, Controller, Post } from '@nestjs/common';
import { WordService } from './word.service';
import { AddWordDTO } from '../../dto/word.dto';
import { User } from '../../decorators/user.decorator';

@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post('create')
  addWord(@Body() data: AddWordDTO, @User('id') id: number) {
    return this.wordService.addWord(data, id);
  }
}
