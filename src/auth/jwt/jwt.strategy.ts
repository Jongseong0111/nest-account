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
    const { user_id, user_account } = payload;
    const user = await this.userRepositry.findOne({ user_id: payload.user_id });

    if (!user) {
      throw new UnauthorizedException('Error');
    }
    return user;
  }
}
