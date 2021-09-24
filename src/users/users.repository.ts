import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserCreateDto } from './dto/users.request.dto';
import { Users } from '../entities/users.entitiy';
import * as bcrypt from 'bcrypt';

@Injectable()
@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  async createUser(userCreateDto: UserCreateDto): Promise<void> {
    const { userAccount, userPassword, userName, userEmail, userType } =
      userCreateDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userPassword, salt);
    const user = this.create({
      userAccount,
      userPassword: hashedPassword,
      userName,
      userEmail,
      userType,
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('Exist Account');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
