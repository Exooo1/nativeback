import {
  BeforeCreate,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  DataType,
} from 'sequelize-typescript';
import { WordEntity } from './word.entity';
import { EnumVerify } from '../constants/auth';

@Table({
  tableName: 'user',
  timestamps: true,
})
export class UserEntity extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Unique
  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  surname: string;

  @Column({ type: DataType.STRING, defaultValue: EnumVerify.NOT_VERIFIED })
  verify: string;

  @HasMany(() => WordEntity, 'userId')
  words: WordEntity[];

  @BeforeCreate
  static async handlerBeforeCreate(instance: UserEntity) {
    instance.email = instance.email.trim();
    instance.surname = instance.email.trim();
    instance.name = instance.email.trim();
  }
}
