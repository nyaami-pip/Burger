import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly restaurantService: RestaurantService,
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    const order = await this.orderRepository.create(createOrderInput);
    return this.orderRepository.save(order);
  }

  async findAll(url: string) {
    const restaurant = await this.restaurantService.findOne(url);
    return await this.orderRepository.find({
      where: { restaurantId: restaurant.id },
      order: { dateAdd: 'DESC' },
    });
  }
}
