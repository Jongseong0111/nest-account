import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserCreateDto } from '../dto/users.request.dto';
import { Users } from '../../entities/users.entitiy';
import { UserRepository } from '../users.repository';
import { UsersService } from '../users.service';
import { userStub } from './stub/user.stub';
import * as faker from 'faker';
import { NotFoundException } from '@nestjs/common';

const mockUserRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(UserRepository));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateUser', () => {
    let user: Users;
    const dto: UserCreateDto = {
      userAccount: faker.lorem.sentence(),
      userEmail: faker.lorem.sentence(),
      userName: faker.lorem.sentence(),
      userPassword: faker.lorem.sentence(),
      userType: faker.lorem.sentence(),
    };

    const updatedUser: Users = {
      userId: userStub().userId,
      ...dto,
    };
    describe('when updateUser is called', () => {
      mockUserRepository.findOne.mockResolvedValue(userStub());

      it('should call findOne method', async () => {
        user = await service.updateUser(userStub().userId, dto);
        expect(mockUserRepository.findOne).toBeCalledWith(userStub().userId);
      });

      it('it should fail if user does not exist', async () => {
        mockUserRepository.findOne.mockResolvedValue(null);

        try {
          await service.updateUser(userStub().userId, dto);
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException);
        }
      });
      mockUserRepository.save.mockResolvedValue(updatedUser);
      it('then it should call save method if user exist', async () => {
        expect(mockUserRepository.save).toBeCalledWith({
          user_id: userStub().userId,
          ...dto,
        });
      });

      it('then it should return a updated user', async () => {
        expect(user).toEqual({
          user_id: userStub().userId,
          ...dto,
        });
      });
    });
  });
});
