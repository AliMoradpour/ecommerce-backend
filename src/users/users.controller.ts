import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import express from 'express';
import UserRoleEnum from './enums/userRoleEnum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Res() res: express.Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    const createUser = await this.usersService.create(createUserDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: createUser,
      message: 'کاربر جدید با موفقیت ساخته شد',
    });
  }

  @Get()
  async findAll(
    @Res() res: express.Response,
    @Query('role') role?: UserRoleEnum,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 1,
  ) {
    const users = await this.usersService.findAll(role, limit, page);

    return res.status(HttpStatus.FOUND).json({
      statusCode: HttpStatus.FOUND,
      data: users,
      message: 'لیست کاربران با موفقیت دریافت شد',
    });
  }

  @Get(':id')
  async findOne(@Res() res: express.Response, @Param('id') id: string) {
    const user = await this.usersService.findOne(+id);

    return res.status(HttpStatus.FOUND).json({
      statusCode: HttpStatus.FOUND,
      data: user,
      message: 'کاربر مورد نظر پیدا شد',
    });
  }

  @Put(':id')
  async update(
    @Res() res: express.Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.update(+id, updateUserDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'کاربر با موفقیت آپدیت شد ',
    });
  }

  @Delete(':id')
  async remove(@Res() res: express.Response, @Param('id') id: string) {
    await this.usersService.remove(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'کاربر مورد نظر با موفقیت حذف شد',
    });
  }
}
