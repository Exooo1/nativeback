import { Column, DataType, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import { WordEntity } from './word.entity';
import { EnumVerify } from '../constants/auth';

@Table({
  tableName: 'user',
  timestamps: true,
})
export class UserEntity extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

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
