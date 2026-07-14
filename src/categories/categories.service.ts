import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { products: true },
    });

    if (!category) throw new NotFoundException('دسته بندی مورد نظر پیدا نشد');

    return category;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: { products: true },
    });
  }

  async removeOnlyCategory(id: number) {
    const category = await this.findOne(id);

    category.products = [];
    await this.categoryRepository.save(category);

    await this.categoryRepository.remove(category);
  }
}
