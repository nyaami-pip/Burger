import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBurgerInput {
  @Field()
  img: string;

  @Field()
  name: string;

  @Field()
  desc: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  status: number;

  @Field(() => Int)
  restaurantId: number;
}
