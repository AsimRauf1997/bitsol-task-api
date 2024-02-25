import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SigninDto, SignupDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schema/auth.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
  ) {}
  async signup(createAuthDto: SignupDto) {
    try {
      return await this.authModel.create(createAuthDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
      }

      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async signin(createAuthDto: SigninDto) {
    const user = await this.authModel.findOne({ email: createAuthDto.email });

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const matchPassword = await bcrypt.compare(
      createAuthDto.password,
      user.password,
    );
    if (!matchPassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = { sub: user._id, email: user.email, role: user.role };
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
