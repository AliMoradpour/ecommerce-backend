import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('adresses')
export class Address {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  province!: string;

  @Column({ nullable: false })
  city!: string;

  @Column({ nullable: false })
  address!: string;

  @Column({ length: 10 })
  postalCode!: string;

  @Column({ length: 11 })
  recieverMobile!: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => User, (user) => user.addresses)
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
