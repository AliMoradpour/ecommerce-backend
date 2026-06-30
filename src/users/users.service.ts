import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import UserRoleEnum from './enums/userRoleEnum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException('هنگام ایجاد کاربر جدید، خطایی رخ داد');
    }
  }

  async findAll(role?: UserRoleEnum, limit: number = 10, page: number = 1) {
    const query = this.userRepository.createQueryBuilder('users');

    if (role) {
      query.where('role = :role', { role });
    }
    query.skip((page - 1) * limit).take(limit);

    return await query.getMany();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`کاربری با آیدی ${id} پیدا نشد`);
    return user;
  }

  async findOneByMobile(mobile: string) {
    const user = await this.userRepository.findOneBy({ mobile });
    if (!user)
      throw new NotFoundException(`کاربری با شماره‌ی ${mobile} پیدا نشد`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    try {
      const updatedUser = await this.userRepository.update(id, {
        displayName: updateUserDto.displayName,
        role: updateUserDto.role,
      });
      return updatedUser;
    } catch (error) {
      throw new BadRequestException('هنگام آپدیت یوزر خطایی رخ داد');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`کاربری با آیدی ${id} پیدا نشد`);
  }
}
