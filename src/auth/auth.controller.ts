import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body(new ValidationPipe()) createAuthDto: SignupDto) {
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);

    const authDtoWithHashedPassword: SignupDto = {
      ...createAuthDto,
      password: hashedPassword,
    };

    const user = await this.authService.signup(authDtoWithHashedPassword);
    return {
      user: user,
      message: 'User registered successfully',
    };
  }

  @Post('signin')
  async signin(@Body(new ValidationPipe()) createAuthDto: SigninDto) {
    const { user, token } = await this.authService.signin(createAuthDto);
    return {
      user: {
        email: user.email,
        role: user.role,
      },
      token,
      message: 'User Signed in successfully',
    };
  }
}
