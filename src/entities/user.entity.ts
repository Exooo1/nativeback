import { Column, DataType, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
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
}
