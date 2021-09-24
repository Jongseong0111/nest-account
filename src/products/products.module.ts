import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { SearchModule } from 'src/search/search.module';
import { SearchService } from 'src/search/search.service';
import { UsersModule } from 'src/users/users.module';
import { ProductService } from './product.service';
import { ProductsController } from './products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), UsersModule, SearchModule],
  providers: [ProductService],
  exports: [TypeOrmModule],
  controllers: [ProductsController],
})
export class ProductModule {}
