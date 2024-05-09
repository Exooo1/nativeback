import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAuth } from '../../types/auth';
import { InjectModel } from '@nestjs/sequelize';
import { ProfileEntity } from '../../entities/auth.entity';
import { responseHelper, whereOptions } from '../../utils/responseHelper';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(ProfileEntity)
    private profileEntity: typeof ProfileEntity,
  ) {
  }

  async profile(data: IAuth) {
    try {
      const { id } = data;
      const whereUser = whereOptions({ id }, true);
      const user = await this.profileEntity.findOne(whereUser);
      if (!user) throw new HttpException('Not Found user', HttpStatus.NOT_FOUND);
      delete user.password;
      return responseHelper('Test', user);
    } catch (err) {
      const error = err as HttpException;
      let status: number;
      if (typeof error.getStatus === 'function') status = error.getStatus();
      if (status) throw new HttpException(error.message, status);
      else throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
