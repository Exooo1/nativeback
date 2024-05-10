import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UserEntity } from './user.entity';

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

  @ForeignKey(() => UserEntity)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;
}
