import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { TYPEORM_MAIN, NODE_ENV } from '@environments';
import { CacheService } from './config';

// Modules
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { BurgerModule } from './burger/burger.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';

// Entities
import { Restaurant } from './restaurant/entities/restaurant.entity';
import { Order } from './order/entities/order.entity';
import { OrderDetail } from './order-detail/entities/order-detail.entity';
import { Burger } from './burger/entities/burger.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    CacheModule.registerAsync({
      useClass: CacheService,
    }),
    TypeOrmModule.forRoot({
      ...TYPEORM_MAIN,
      synchronize: NODE_ENV === 'production' ? false : true,
      entities: [User, Restaurant, Burger, OrderDetail, Order],
    }),

    UsersModule,
    AuthModule,
    RestaurantModule,
    BurgerModule,
    OrderModule,
    OrderDetailModule,
  ],
})
export class AppModule {}
