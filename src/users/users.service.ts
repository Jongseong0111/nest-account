import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { Users } from '../entities/users.entitiy';
import { UserCreateDto } from './dto/users.request.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async createUser(userCreateDto: UserCreateDto): Promise<Users> {
    const user = this.usersRepository.create(userCreateDto);
    return await this.usersRepository.save(user);
  }

  getUsers(): Promise<Users[]> {
    console.log('dd');
    return this.usersRepository.find();
  }

  async getUser(id: number): Promise<Users> {
    const user = await this.usersRepository.findOne(id);

    if (user === undefined) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async updateUser(id: number, userCreateDto: UserCreateDto): Promise<Users> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    user.userAccount = userCreateDto.userAccount;
    user.userEmail = userCreateDto.userEmail;
    user.userName = userCreateDto.userName;
    user.userPassword = userCreateDto.userPassword;
    user.userType = userCreateDto.userType;

    return await this.usersRepository.save(user);
  }

  async deleteUser(user_id: number) {
    await this.usersRepository.delete(user_id);
  }
}
