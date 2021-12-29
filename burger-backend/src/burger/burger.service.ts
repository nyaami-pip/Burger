import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { Repository } from 'typeorm';
import { CreateBurgerInput } from './dto/create-burger.input';
import { UpdateBurgerInput } from './dto/update-burger.input';
import { Burger } from './entities/burger.entity';

@Injectable()
export class BurgerService {
  constructor(
    @InjectRepository(Burger)
    private readonly burgerRepository: Repository<Burger>,
    private readonly restaurantService: RestaurantService,
  ) {}

  async findAll(url: string) {
    const restaurant = await this.restaurantService.findOne(url);

    return await this.burgerRepository.find({
      where: {
        restaurantId: restaurant.id,
      },
    });
  }

  async create(createBurgerInput: CreateBurgerInput) {
    const burger = await this.burgerRepository.create(createBurgerInput);
    return await this.burgerRepository.save(burger);
  }

  async update(updateBurgerInput: UpdateBurgerInput) {
    const burger = await this.burgerRepository.findOne(updateBurgerInput.id);

    burger.status = updateBurgerInput.status;
    burger.img = updateBurgerInput.img;
    burger.name = updateBurgerInput.name;
    burger.price = updateBurgerInput.price;
    burger.desc = updateBurgerInput.desc;

    return await this.burgerRepository.save(burger);
  }

  async remove(id: number) {
    const burger = await this.burgerRepository.findOne(id);
    await this.burgerRepository.remove(burger);

    return await this.burgerRepository.find({
      where: {
        restaurantId: burger.restaurantId,
      },
    });
  }
}
