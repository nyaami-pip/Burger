import { CreateBurgerInput } from './create-burger.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBurgerInput extends PartialType(CreateBurgerInput) {
  @Field(() => Int)
  id: number;
}
