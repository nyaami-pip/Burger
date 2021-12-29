import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderDetailInput {
  @Field(() => Int, { nullable: false })
  orderId: number;

  @Field(() => Int, { nullable: false })
  burgerId: number;

  @Field(() => Int, { nullable: false })
  count: number;
}
