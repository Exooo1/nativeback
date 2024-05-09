import { Column, DataType, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import { WordEntity } from './word.entity';

@Table({
  tableName: 'profile',
  timestamps: true,
})
export class ProfileEntity extends Model {
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

  @Column({ type: DataType.STRING })
  verify: string;

  @HasMany(() => WordEntity, 'profileId')
  words: WordEntity[];
}
