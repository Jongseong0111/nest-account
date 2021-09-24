import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRepository } from './users/users.repository';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsController } from './products/products.controller';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([UserRepository]),
    AuthModule,
    ProductModule,
    OrdersModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
