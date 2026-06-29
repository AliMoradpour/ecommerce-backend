import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class LoginDto {
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
  password!: string;
}