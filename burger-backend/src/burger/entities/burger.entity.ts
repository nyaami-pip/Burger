import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('FK_burger_restaurant', ['restaurantId'])
@ObjectType()
@Entity('burger')
export class Burger {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { nullable: false })
  @Column({ type: 'int', nullable: false })
  restaurantId: number;

  @Column({ type: 'text' })
  @Field({ nullable: false })
  img: string;

  @Column({ type: 'varchar' })
  @Field({ nullable: false })
  name: string;

  @Column({ type: 'text' })
  @Field({ nullable: false })
  desc: string;

  @Column({ type: 'int' })
  @Field({ nullable: false })
  price: number;

  @Column({ type: 'int' })
  @Field({ nullable: false })
  status: number;

  /////////////////////////////////////////////////////////////////////////////////
  // Relations

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.burgers, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'restaurantId', referencedColumnName: 'id' })
  restaurant: Restaurant;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.burger)
  orderDetail: OrderDetail[];
}
