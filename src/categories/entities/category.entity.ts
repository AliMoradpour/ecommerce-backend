import { Product } from 'src/products/entities/product.entity';
import { ManyToMany } from 'typeorm/browser';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm/browser';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
