import express from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(
    @Res() res: express.Response,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    const address = await this.addressService.create(createAddressDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: address,
      message: 'آدرس با موفقیت ساخته شد',
    });
  }

  @Get()
  async findAll(@Res() res: express.Response) {
    const addresses = await this.addressService.findAll();

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: addresses,
      message: 'لیست آدرس ها با موفقیت دریافت شد',
    });
  }

  @Get(':id')
  async findOne(@Res() res: express.Response, @Param('id') id: string) {
    const address = await this.addressService.findOne(+id);

    return res.status(HttpStatus.FOUND).json({
      statusCode: HttpStatus.FOUND,
      data: address,
      message: 'آدرس با موفقیت پیدا شد',
    });
  }

  @Patch(':id')
  async update(
    @Res() res: express.Response,
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    const address = await this.addressService.update(+id, updateAddressDto);

    return res.status(HttpStatus.FOUND).json({
      statusCode: HttpStatus.FOUND,
      data: address,
      message: 'آدرس با موفقیت آپدیت شد',
    });
  }

  @Delete(':id')
  async remove(@Res() res: express.Response, @Param('id') id: string) {
    this.addressService.remove(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'آدرس با موفقیت حذف شد',
    });
  }
}
