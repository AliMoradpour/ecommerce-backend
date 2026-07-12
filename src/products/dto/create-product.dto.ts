import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'مقدار عنوان نباید خالی باشد' })
  @IsString({ message: 'مقدار عنوان باید رشته باشد' })
  title!: string;

  @IsNotEmpty({ message: 'مقدار توضیحات نباید خالی باشد' })
  @IsString({ message: 'مقدار توضیحات باید رشته باشد' })
  description!: string;

  @IsNotEmpty({ message: 'مقدار قیمت نباید خالی باشد' })
  @IsInt({ message: 'مقدار قیمت باید عدد باشد' })
  price!: number;

  @IsNotEmpty({ message: 'مقدار تعداد نباید خالی باشد' })
  @IsInt({ message: 'مقدار تعداد باید عدد باشد' })
  stock!: number;

  @IsOptional()
  @IsArray({ message: 'مقدار آیدی دسته‌بندی باید آرایه ای از اعداد باشد' })
  categoryIds?: number[];
}
