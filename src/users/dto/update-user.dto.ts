import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import UserRoleEnum from '../enums/userRoleEnum';

export class UpdateUserDto {
  @IsString({ message: 'نام باید یک رشته باشد' })
  @IsNotEmpty({ message: 'نام کاربری نمیتواند خالی باشد' })
  display_name!: string;

  @IsEnum(UserRoleEnum, { message: 'نقش کاربر باید admin یا user باشد.' })
  role?: UserRoleEnum;
}
