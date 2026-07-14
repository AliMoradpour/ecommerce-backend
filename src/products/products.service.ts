import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createProductDto: CreateProductDto): Promise<Product> {
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

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { title, price, description, stock, categoryIds } = updateProductDto;
    const product = await this.findOne(id);

    if (title) product.title = title;
    if (price) product.price = price;
    if (description) product.description = description;
    if (stock) product.stock = stock;
    if (categoryIds) {
      const categories = await this.categoryReposiory.findBy({
        id: In(categoryIds),
      });
      product.categories = categories;
    }

    return await this.productReposiory.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productReposiory.find({
      relations: { categories: true },
    });
  }

  async findOne(id: number) {
    const product = await this.productReposiory.findOne({
      where: { id },
      relations: { categories: true },
    });

    if (!product) throw new NotFoundException('محصول پیدا نشد');

    return product;
  }

  async remove(id: number) {}
}
