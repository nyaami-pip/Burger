import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BurgerService } from './burger.service';
import { Burger } from './entities/burger.entity';
import { CreateBurgerInput } from './dto/create-burger.input';
import { UpdateBurgerInput } from './dto/update-burger.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/entities/role.enum';

@Resolver(() => Burger)
export class BurgerResolver {
  constructor(private readonly burgerService: BurgerService) {}

  @Query(() => [Burger], { name: 'burgers' })
  findAll(@Args('url') url: string) {
    return this.burgerService.findAll(url);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Burger)
  createBurger(
    @Args('createBurgerInput') createBurgerInput: CreateBurgerInput,
  ) {
    return this.burgerService.create(createBurgerInput);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Burger)
  updateBurger(
    @Args('updateBurgerInput') updateBurgerInput: UpdateBurgerInput,
  ) {
    return this.burgerService.update(updateBurgerInput);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => [Burger])
  removeBurger(@Args('id', { type: () => Int }) id: number) {
    return this.burgerService.remove(id);
  }
}
