import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty({ message: 'آیدی کاربر نمیتواند خالی باشد' })
  userId!: number;

  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  @IsString({ message: 'عنوان باید رشته باشد' })
  title!: string;

  @IsNotEmpty({ message: 'موضوع نمیتواند خالی باشد' })
  @IsString({ message: 'موضوع باید رشته باشد' })
  subject!: string;

  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  @IsString({ message: 'توضیحات باید رشته باشد' })
  description!: string;

  @IsOptional()
  replyTo?: number;
}
