import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from 'src/users/dto/users.request.dto';
import { UserRepository } from 'src/users/users.repository';

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
    const { user_account, user_password } = loginRequestDto;
    const user = await this.userRepository.findOne({ user_account });

    if (!user || !(await bcrypt.compare(user_password, user.user_password))) {
      throw new UnauthorizedException('Login Failed');
    }

    const payload = { user_id: user.user_id, user_account };
    const accesstoken = await this.jwtService.sign(payload);

    return { accesstoken };
  }
}
