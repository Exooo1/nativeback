import { Body, Controller, Post } from '@nestjs/common';
import { WordService } from './word.service';
import { AddWordDTO } from '../../dto/word.dto';
import { User } from '../../decorators/user.decorator';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  addWord(@Body() data: AddWordDTO, @User('id') id: number) {
    return this.wordService.addWord(data, id);
  }
}
