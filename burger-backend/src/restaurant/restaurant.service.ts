import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async findOne(url: string) {
    return await this.restaurantRepository.findOne({
      where: {
        url,
      },
    });
  }

  async findAll() {
    return await this.restaurantRepository.find();
  }
}
