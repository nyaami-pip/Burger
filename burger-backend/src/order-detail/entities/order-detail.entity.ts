import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Burger } from 'src/burger/entities/burger.entity';
import { Order } from 'src/order/entities/order.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('FK_order_user', ['orderId'])
@Index('FK_order_burger', ['burgerId'])
@ObjectType()
@Entity('order_detail')
export class OrderDetail {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { nullable: false })
  @Column({ nullable: false })
  orderId: number;

  @Field(() => Int, { nullable: false })
  @Column({ nullable: false })
  burgerId: number;

  @Field(() => Int, { nullable: false })
  @Column({ nullable: false })
  count: number;

  /////////////////////////////////////////////////////////////////////////////////
  // Relations

  @ManyToOne(() => Order, (order) => order.orderDetail, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
  order: Order;

  @ManyToOne(() => Burger, (order) => order.orderDetail, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'burgerId', referencedColumnName: 'id' })
  burger: Burger;
}
