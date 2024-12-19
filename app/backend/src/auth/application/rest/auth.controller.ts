import { Body, Controller, Get, Post, Response } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDTO, LoginUserDTO } from '../dto/auth.dto';
import { AuthService } from 'src/auth/domains/auth.service';
import {
  COOKIE_NAME,
  JWT_EXPIRY_SECONDS,
} from 'src/shared/constants/global.constants';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ description: 'Login user' })
  @ApiBody({ type: LoginUserDTO })
  @ApiResponse({ type: AuthResponseDTO })
  async login(
    @Body() user: LoginUserDTO,
    @Response() res,
  ): Promise<AuthResponseDTO> {
    const loginData = await this.authService.login(user);

    res.cookie(COOKIE_NAME, loginData.accessToken, {
      expires: new Date(new Date().getTime() + JWT_EXPIRY_SECONDS * 1000),
      sameSite: 'strict',
      secure: true,
      httpOnly: true,
    });

    return res.status(200).send(loginData);
  }

  @Get('logout')
  logout(@Response() res): void {
    res.clearCookie(COOKIE_NAME);
    res.status(200).send({ success: true });
  }
}
