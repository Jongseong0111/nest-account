import { userStub } from '../../users/test/stub/user.stub';

export const AuthService = jest.fn().mockReturnValue({
  signUp: jest.fn().mockResolvedValue(userStub()),
  signIn: jest.fn().mockResolvedValue({ accesstoken: '1234' }),
});
