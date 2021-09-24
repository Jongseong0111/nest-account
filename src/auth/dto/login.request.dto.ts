import { PickType } from '@nestjs/swagger';
import { Users } from '../../entities/users.entitiy';

export class LoginRequestDto extends PickType(Users, [
  'userAccount',
  'userPassword',
] as const) {}
