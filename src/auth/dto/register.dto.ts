import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'موبایل نمیتواند خالی باشد' })
  @IsString({ message: 'موبایل باید رشته باشد' })
  @Length(11, 11, { message: 'شماره موبایل باید 11 رقم باشد' })
  @Matches(/^09\d{9}$/, {
    message: 'شماره موبایل معتبر نیست',
  })
  @Transform(({ value }) => value.trim())
  mobile!: string;

  @IsNotEmpty({ message: 'رمز عبور نمیتواند خالی باشد' })
  @IsString({ message: 'رمز عبور باید رشته باشد' })
  // @MinLength(8, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد' }) Just For Development
  @MaxLength(14, { message: 'رمز عبور باید حداکثر 14 کاراکتر باشد' })
  password!: string;

  @IsNotEmpty({ message: 'نام نمیتواند خالی باشد' })
  @IsString({ message: 'نام باید رشته باشد' })
  displayName!: string;
}
