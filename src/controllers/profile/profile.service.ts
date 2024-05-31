import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from '../../entities/user.entity';
import { responseHelper, whereOptions } from '../../utils/responseHelper';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(UserEntity)
    private userEntity: typeof UserEntity,
  ) {}

  async profile(id: string) {
    try {
      const whereUser = whereOptions({ id }, true);
      const user = await this.userEntity.findOne(whereUser);
      if (!user) throw new HttpException('Not Found user', HttpStatus.NOT_FOUND);
      delete user.password;
      return responseHelper('Test');
    } catch (err) {
      const error = err as HttpException;
      let status: number;
      if (typeof error.getStatus === 'function') status = error.getStatus();
      if (status) throw new HttpException(error.message, status);
      else throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
