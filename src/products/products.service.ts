import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productReposiory: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryReposiory: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { title, price, description, stock, categoryIds } = createProductDto;

    const product = await this.productReposiory.create({
      title,
      description,
      price,
      stock,
    });

    if (categoryIds) {
      const categories = await this.categoryReposiory.findBy({
        id: In(categoryIds),
      });
      product.categories = categories;
    }
    return await this.productReposiory.save(product);
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
