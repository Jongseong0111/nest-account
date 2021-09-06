import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { Users } from 'src/users/users.entitiy';

export const userStub = (): Users => {
  return {
    user_account: 'leon',
    user_email: 'leon1111@naver.com',
    user_type: 'manufacturer',
    user_id: 234,
    user_name: 'leon',
    user_password: '1234',
  };
};

export const loginDtoStub = (): LoginRequestDto => {
  return {
    user_password: '1234',
    user_account: 'leon',
  };
};
