import { PickType } from '@nestjs/swagger';
import { Users } from 'src/users/users.entitiy';

export class LoginRequestDto extends PickType(Users, [
  'user_account',
  'user_password',
] as const) {}
