import { userStub } from '../test/stub/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  getUser: jest.fn().mockResolvedValue(userStub()),
});
