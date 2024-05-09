import { Get, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfileEntity } from '../../entities/auth.entity';
import { InjectModel } from '@nestjs/sequelize';
import { LoginDTO, SignUpDTO } from '../../dto/auth.dto';
import { EmptyResponse } from '../../dto/common.dto';
import { responseHelper, TResponse, whereOptions } from '../../utils/responseHelper';
import { emailRegex } from '../../constants/auth';
import { MailerService } from '@nestjs-modules/mailer';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as bcrypt from 'bcryptjs';
import { TSendEmail, TTokenResponse } from '../../types/auth';
import { TokenService } from '../../guard/auth/tokens.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectModel(ProfileEntity)
    private profileEntity: typeof ProfileEntity,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly tokenService: TokenService,
  ) {}

  signUpTime(verify: string, milliseconds: number) {
    const timeout = setTimeout(async () => {
      const whereProfile = whereOptions({ verify });
      const profile = await this.profileEntity.findOne(whereProfile);
      if (profile) await this.profileEntity.destroy(whereProfile);
    }, milliseconds);
    this.schedulerRegistry.addTimeout('signUpTime' + verify, timeout);
  }

  async signUp(data: SignUpDTO): Promise<EmptyResponse> {
    try {
      const { email, password, name } = data;
      if (!emailRegex.test(email))
        throw new HttpException({ message: 'Incorrect email' }, HttpStatus.FORBIDDEN);
      const time = new Date().getTime();
      const verify = (time * Math.random()).toString(32) + time + name;
      const profile = await this.profileEntity.create({
        ...data,
        verify,
      });
      profile.password = await bcrypt.hash(password, 12);
      await profile.save();
      const isSentEmail = await this.sendEmail({ name, email, verify }, true);
      if (isSentEmail !== HttpStatus.OK)
        throw new HttpException('We cannot send you a letter', HttpStatus.NOT_ACCEPTABLE);
      this.signUpTime(verify, 900_000);
      return responseHelper(
        'We have sent you an email confirming that if you do not confirm your email within 15 minutes we will be forced to delete your account',
      );
    } catch (err) {
      const error = err as HttpException;
      let status: number;
      if (typeof error.getStatus === 'function') status = error.getStatus();
      if (status === HttpStatus.NOT_ACCEPTABLE) {
        const whereProfile = whereOptions({ email: data.email });
        await this.profileEntity.destroy(whereProfile);
        throw new HttpException(error.message, status);
      }
      if (error.name === 'SequelizeUniqueConstraintError')
        throw new HttpException('This email is already registered', HttpStatus.FORBIDDEN);
      if (status) throw new HttpException(error.message, status);
      else throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async sendEmail(data: TSendEmail, isCreated: boolean): Promise<number> {
    try {
      const { name, email, verify } = data;
      await this.mailerService.sendMail({
        to: email,
        subject: isCreated ? 'Vocabulary sing up' : 'Change password',
        template: isCreated ? 'email' : 'password',
        text: `Dear ${name} please verify your account http://192.168.100.2:8080/auth/verify/${verify}`,
      });
      return HttpStatus.OK;
    } catch (err) {
      const error = err as Error;
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async verifyEmail(id: string): Promise<TResponse<null>> {
    try {
      if (!id) throw new HttpException('Not found verify code', HttpStatus.NOT_FOUND);
      const whereVerify = whereOptions({ verify: id });
      const profile = await this.profileEntity.findOne(whereVerify);
      if (!profile) throw new HttpException('The account was deleted', HttpStatus.NOT_FOUND);
      profile.verify = 'verified';
      await profile.save();
      return responseHelper('The account was verified');
    } catch (err) {
      const error = err as Error;
      throw new HttpException(error.message, HttpStatus.PRECONDITION_FAILED);
    }
  }

  async login(data: LoginDTO): Promise<TResponse<TTokenResponse>> {
    try {
      const { password, email } = data;
      const whereUser = whereOptions({ email });
      const user = await this.profileEntity.findOne(whereUser);
      if (!user) throw new HttpException('You arent authorized', HttpStatus.NOT_FOUND);
      if (user.verify !== 'verified')
        throw new HttpException('Please confirm your email', HttpStatus.FORBIDDEN);
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) throw new HttpException('Email or password is incorrect', HttpStatus.NOT_FOUND);
      return responseHelper('welcome to us', { ...this.tokenService.createTokens(user.dataValues) });
    } catch (err) {
      const error = err as HttpException;
      let status: number;
      if (typeof error.getStatus === 'function') status = error.getStatus();
      if (status) throw new HttpException(error.message, status);
      else throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Get('test')
  async forgetPassword(): Promise<null> {
    try {
      return null;
    } catch (error) {}
  }
}
