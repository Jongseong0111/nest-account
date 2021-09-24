import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { Users } from 'src/entities/users.entitiy';

export const userStub = (): Users => {
  return {
    userAccount: 'leon',
    userEmail: 'leon1111@naver.com',
    userType: 'manufacturer',
    userId: 234,
    userName: 'leon',
    userPassword: '1234',
  };
};

export const loginDtoStub = (): LoginRequestDto => {
  return {
    userPassword: '1234',
    userAccount: 'leon',
  };
};
