import { Module } from '@nestjs/common';
import { BurgerService } from './burger.service';
import { BurgerResolver } from './burger.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Burger } from './entities/burger.entity';
import { RestaurantModule } from '../restaurant/restaurant.module';

@Module({
  imports: [TypeOrmModule.forFeature([Burger]), RestaurantModule],
  providers: [BurgerResolver, BurgerService],
})
export class BurgerModule {}
