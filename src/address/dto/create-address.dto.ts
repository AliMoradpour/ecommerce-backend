import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'استان نمیتواند خالی باشد' })
  @IsString({ message: 'مقدار استان باید رشته باشد' })
  province!: string;

  @IsNotEmpty({ message: 'شهر نمیتواند خالی باشد' })
  @IsString({ message: 'مقدار شهر باید رشته باشد' })
  city!: string;

  @IsString({ message: 'مقدار کد پستی باید رشته باشد' })
  @Length(10, 10, { message: 'کد پستی باید 10 رقم باشد' })
  postalCode?: string;

  @IsNotEmpty({ message: 'آدرس نمیتواند خالی باشد' })
  @IsString({ message: 'مقدار آدرس باید رشته باشد' })
  address!: string;

  @IsNotEmpty({ message: 'موبایل نمیتواند خالی باشد' })
  @IsString({ message: 'موبایل باید رشته باشد' })
  @Length(11, 11, { message: 'شماره موبایل باید 11 رقم باشد' })
  @Matches(/^09\d{9}$/, {
    message: 'شماره موبایل معتبر نیست',
  })
  @Transform(({ value }) => value.trim())
  recieverMobile!: string;

  @IsOptional()
  @IsString({ message: 'مقدار توضیحات باید رشته باشد' })
  description?: string;
}
