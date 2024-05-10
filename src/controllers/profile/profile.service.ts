import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAuth } from '../../types/auth';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from '../../entities/user.entity';
import { responseHelper, whereOptions } from '../../utils/responseHelper';
import { WordEntity } from '../../entities/word.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(UserEntity)
    private userEntity: typeof UserEntity,
  ) {}

  async profile(data: IAuth) {
    try {
      const { id } = data;
      const whereUser = whereOptions({ id }, true);
      const test = await this.userEntity.findOne({ where: { id: 1 }, include: [{ model: WordEntity }] });
      console.log(test);
      const user = await this.userEntity.findOne(whereUser);
      if (!user) throw new HttpException('Not Found user', HttpStatus.NOT_FOUND);
      delete user.password;
      return responseHelper('Test', test);
    } catch (err) {
      const error = err as HttpException;
      let status: number;
      if (typeof error.getStatus === 'function') status = error.getStatus();
      if (status) throw new HttpException(error.message, status);
      else throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
