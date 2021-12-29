import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderDetailService } from './order-detail.service';
import { OrderDetail } from './entities/order-detail.entity';
import { CreateOrderDetailInput } from './dto/create-order-detail.input';
import { UpdateOrderDetailInput } from './dto/update-order-detail.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => OrderDetail)
export class OrderDetailResolver {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => OrderDetail)
  createOrderDetail(
    @Args('input')
    createOrderDetailInput: CreateOrderDetailInput,
  ) {
    return this.orderDetailService.create(createOrderDetailInput);
  }
}
