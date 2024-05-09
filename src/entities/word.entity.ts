import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ProfileEntity } from './auth.entity';

@Table({
  tableName: 'words',
  timestamps: true,
})
export class WordEntity extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  word: string;

  @Column({ type: DataType.STRING })
  translate: string;

  @Column({ type: DataType.JSON })
  examples: string[];

  @BelongsTo(() => ProfileEntity, 'profileId')
  profile: ProfileEntity;
}
