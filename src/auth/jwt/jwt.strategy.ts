import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/users/users.repository';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepositry: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretkey',
      ignoreExplanation: false,
    });
  }

  async validate(payload: Payload) {
    const { userId, userAccount } = payload;
    const user = await this.userRepositry
      .createQueryBuilder('user')
      .select([
        'user.userId',
        'user.userAccount',
        'user.userEmail',
        'user.userType',
        'user.userName',
      ])
      .where('user.userId = :userId', { userId, userAccount })
      .getOne();
    if (!user) {
      throw new UnauthorizedException('UnAuthorized User');
    }
    return user;
  }
}
