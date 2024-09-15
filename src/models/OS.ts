import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class OS extends Model {
  public id!: number;
  public name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

OS.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'os',
  },
);

export default OS;
