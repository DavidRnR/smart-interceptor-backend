import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class ProgrammingLang extends Model {
  public id!: number;
  public name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

ProgrammingLang.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'programminglang',
  },
);

export default ProgrammingLang;
