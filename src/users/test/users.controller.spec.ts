import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from '../../auth/auth.service';
import { UsersController } from '../users.controller';
import { Users } from '../users.entitiy';
import { UsersService } from '../users.service';
import { loginDtoStub, userStub } from './stub/user.stub';

jest.mock('../users.service');
jest.mock('../../auth/auth.service');

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  let authService: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, AuthService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: Users;

      beforeEach(async () => {
        user = await controller.getUser(userStub().user_id);
      });

      test('then it should call usersService', () => {
        expect(usersService.getUser).toBeCalledWith(userStub().user_id);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('signIn', () => {
    describe('when signIn is called', () => {
      let token: {};

      beforeEach(async () => {
        token = await controller.signIn(loginDtoStub());
      });

      test('then it should call authService', () => {
        expect(authService.signIn).toBeCalledWith(loginDtoStub());
      });

      test('then it should return token', () => {
        expect(token).toEqual({ accesstoken: '1234' });
      });
    });
  });
});
