import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Burger } from 'src/burger/entities/burger.entity';
import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('restaurant')
export class Restaurant {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @Field({ nullable: false })
  url: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @Field({ nullable: false })
  title: string;

  /////////////////////////////////////////////////////////////////////////////////
  // Relations

  @OneToMany(() => Burger, (burger) => burger.restaurant)
  burgers: Burger[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Burger[];
}
