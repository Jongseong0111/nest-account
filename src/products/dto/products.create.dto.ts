import { IsNotEmpty, IsString } from 'class-validator';

export class productsCreateDto {
  @IsNotEmpty()
  @IsString()
  productName!: string;

  @IsNotEmpty()
  @IsString()
  productColor?: string | null;

  @IsNotEmpty()
  @IsString()
  productSize?: string | null;
}
