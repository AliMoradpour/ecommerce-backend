import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Res,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import express from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Res() res: express.Response,
    @Body() createProductDto: CreateProductDto,
  ) {
    const product = await this.productsService.create(createProductDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: product,
      message: 'محصول با موفقیت ساخته شد',
    });
  }

  @Get()
  async findAll(@Res() res: express.Response) {
    const products = await this.productsService.findAll();
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: products,
      message: 'لیست محصولات با موفقیت پیدا شد',
    });
  }

  @Get(':id')
  async findOne(@Res() res: express.Response, @Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: product,
      message: 'محصول مورد نظر پیدا شد',
    });
  }

  @Patch(':id')
  async update(
    @Res() res: express.Response,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.update(+id, updateProductDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: product,
      message: 'محصول به موفقیت آپدیت شد',
    });
  }

  @Delete(':id')
  async remove(@Res() res: express.Response, @Param('id') id: string) {
    await this.productsService.remove(+id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: `محصول ${id} با موفقیت حذف شد`,
    });
  }
}
