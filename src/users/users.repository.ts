import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserCreateDto } from './dto/users.request.dto';
import { Users } from './users.entitiy';
import * as bcrypt from 'bcrypt';

@Injectable()
@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  async createUser(userCreateDto: UserCreateDto): Promise<void> {
    const { user_account, user_password, user_name, user_email, user_type } =
      userCreateDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user_password, salt);
    const user = this.create({
      user_account,
      user_password: hashedPassword,
      user_name,
      user_email,
      user_type,
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Exist Account');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  // async findByIdWithoutPassword(user_id: number):Promise<Users | null>{
  //   const user = await this.findOne(user_id).select('-user_password');
  //   return user;
  // }
}
