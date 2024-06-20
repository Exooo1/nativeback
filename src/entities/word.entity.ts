import { BeforeCreate, BeforeSave, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
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

  @Column({ type: DataType.JSON, defaultValue: null })
  examples: string[];

  @ForeignKey(() => UserEntity)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @BeforeCreate
  static createWord(instance: WordEntity) {
    helperWord(instance);
  }

  @BeforeSave
  static saveWord(instance: WordEntity) {
    helperWord(instance);
  }
}

const helperWord = (instance: WordEntity) => {
  instance.word = (instance.word[0].toUpperCase() + instance.word.slice(1)).trim();
  instance.translate = (instance.translate[0].toUpperCase() + instance.translate.slice(1)).trim();
  if (instance?.examples?.length) {
    instance.examples = instance.examples.map((x) => (x[0].toUpperCase() + x.slice(1)).trim());
  }
};
