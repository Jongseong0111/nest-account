import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entitiy';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '12345',
  database: 'test1',
  entities: [Users],
  synchronize: true,
};

export = config;
