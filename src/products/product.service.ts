import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Users } from 'src/entities/users.entitiy';
import { SearchService } from 'src/search/search.service';
import { SearchServiceInterface } from 'src/search/search.service.interface';
import { Connection, getConnection, Repository } from 'typeorm';
import { productsCreateDto } from './dto/products.create.dto';
import { ProductsController } from './products.controller';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private connection: Connection,
    readonly esService: SearchService,
  ) {
    this.connection = connection;
    this.productRepository = productRepository;
  }

  async createProduct(
    user: Users,
    productCreateDto: productsCreateDto,
  ): Promise<Product[]> {
    const product = {
      createUserId: user.userId,
      user,
      ...productCreateDto,
    };

    const { productName, ...dto } = productCreateDto;

    const mockDto = { productName: productName + '1', ...dto };
    const product2 = {
      createUserId: user.userId,
      user,
      ...mockDto,
    };

    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const newProduct = this.productRepository.create(product);
      // const new1 = await this.productRepository.save(newProduct);
      const new1 = await queryRunner.manager.save(newProduct);

      const newProduct2 = this.productRepository.create(product2);
      const new2 = await queryRunner.manager.save(newProduct2);

      await queryRunner.commitTransaction();
      return [new1, new2];
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getProductByUser(userId: number) {
    const result = await this.productRepository
      .createQueryBuilder('product')
      .innerJoin('product.user', 'user')
      .select([
        'product',
        'user.userAccount',
        'user.userName',
        "CONCAT(product.productName, '_', product.productColor,'_', ROUND(product.productSize * 10)) AS productCode",
      ])
      .where('user.userId = :userId', { userId })
      .getRawMany();

    return result;
  }

  async getProduct(productId: number) {
    const product = await this.productRepository.findOne(productId);

    if (!product) {
      throw new NotFoundException('No Products');
    }

    const result = await this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.user', 'user')
      .select([
        'product',
        'user.userAccount AS Produttore',
        'user.userName',
        "CONCAT(product.productName, '_', product.productColor,'_', ROUND(product.productSize * 10,)) AS productCode",
      ])
      .where('product.productId = :productId', { productId })
      .getRawOne();

    console.log(result);
    return result;
  }

  async getProducts(search: string) {
    return await this.esService.search(search);
  }
}
