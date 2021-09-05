import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { request, Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { GetUser } from 'src/auth/getuser.decorator';
import { JwtAuthGaurd } from 'src/auth/jwt/jwt.guard';
import { UserCreateDto } from './dto/users.request.dto';
import { Users } from './users.entitiy';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() userCreateDto: UserCreateDto) {
    return await this.userService.createUser(userCreateDto);
  }

  @Post('signup')
  @HttpCode(201)
  async signUp(@Body(ValidationPipe) userCreateDto: UserCreateDto) {
    return await this.authService.signUp(userCreateDto);
  }

  @Post('signin')
  async signIn(@Body(ValidationPipe) loginRequestDto: LoginRequestDto) {
    return await this.authService.signIn(loginRequestDto);
  }

  @UseGuards(JwtAuthGaurd)
  @Get('current')
  async getCurrentUser(@GetUser() user: Users) {
    return user;
  }
  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id', new ParseIntPipe()) id: number) {
    return await this.userService.getUser(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() userCreateDto: UserCreateDto,
  ) {
    return await this.userService.updateUser(id, userCreateDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.deleteUser(id);
  }
}
