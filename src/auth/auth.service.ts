import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from 'src/users/dto/users.request.dto';
import { UserRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userCreateDto: UserCreateDto): Promise<void> {
    return await this.userRepository.createUser(userCreateDto);
  }
  async signIn(loginRequestDto: LoginRequestDto): Promise<object> {
    const { userAccount, userPassword } = loginRequestDto;
    const user = await this.userRepository.findOne({ userAccount });

    if (!user || !(await bcrypt.compare(userPassword, user.userPassword))) {
      throw new UnauthorizedException('Login Failed');
    }

    const payload = { userId: user.userId, userAccount };
    const accesstoken = await this.jwtService.sign(payload);

    return { accesstoken };
  }
}
