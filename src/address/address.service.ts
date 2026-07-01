import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const { userId, ...addressData } = createAddressDto;
    const user = await this.userRepository.findOneByOrFail({ id: userId });
    const address = await this.addressRepository.create({
      ...addressData,
      user,
    });

    return this.addressRepository.save(address);
  }

  async findAll(): Promise<Address[]> {
    const address = await this.addressRepository.find({ relations: ['user'] });
    return address;
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!address) throw new NotFoundException('آدرس پیدا نشد');

    return address;
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.findOne(id);
    Object.assign(address, updateAddressDto);
    return await this.addressRepository.save(address);
  }

  async remove(id: number): Promise<void> {
    const address = await this.findOne(id);
    await this.addressRepository.remove(address);
  }
}
