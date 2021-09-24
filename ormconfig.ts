import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entitiy';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '12345',
  database: 'test4',
  // entities: [Users, Product],
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
};

export = config;
