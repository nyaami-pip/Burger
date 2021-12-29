import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  restaurantId: number;
}
