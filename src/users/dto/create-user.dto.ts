import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import UserRoleEnum from '../enums/userRoleEnum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'موبایل نمیتواند خالی باشد' })
  @IsString({ message: 'موبایل باید رشته باشد' })
  @Length(11, 11, { message: 'شماره موبایل باید 11 رقم باشد' })
  @Matches(/^09\d{9}$/, {
    message: 'شماره موبایل معتبر نیست',
  })
  @Transform(({ value }) => value.trim())
  mobile!: string;

  @IsNotEmpty({ message: 'نام نمیتواند خالی باشد' })
  @IsString({ message: 'نام باید رشته باشد' })
  displayName!: string;

  @IsString({ message: 'رمز عبور باید رشته باشد' })
  @IsOptional()
  // @MinLength(8, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد' }) Just For Development
  @MaxLength(16, { message: 'رمز عبور باید حداکثر 16 کاراکتر باشد' })
  password?: string;

  @IsEnum(UserRoleEnum, { message: 'نقش کاربر باید admin یا user باشد' })
  @IsOptional()
  role?: UserRoleEnum;
}
