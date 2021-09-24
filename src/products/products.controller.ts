import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/getuser.decorator';
import { JwtAuthGaurd } from 'src/auth/jwt/jwt.guard';
import { Users } from 'src/entities/users.entitiy';
import { productsCreateDto } from './dto/products.create.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  @HttpCode(201)
  @UseGuards(JwtAuthGaurd)
  async createProduct(
    @GetUser() user: Users,
    @Body(ValidationPipe) productCreateDto: productsCreateDto,
  ) {
    return await this.productService.createProduct(user, productCreateDto);
  }

  @Get('/user/:userId')
  @UseGuards(JwtAuthGaurd)
  async getProductByUser(
    @Param('userId', new ParseIntPipe()) productId: number,
  ) {
    return await this.productService.getProductByUser(productId);
  }

  @Get('/:productId')
  @UseGuards(JwtAuthGaurd)
  async getProduct(@Param('productId', new ParseIntPipe()) productId: number) {
    return await this.productService.getProduct(productId);
  }

  @Get('')
  async getProducts(@Query('search') search: string) {
    return await this.productService.getProducts(search);
  }
}
