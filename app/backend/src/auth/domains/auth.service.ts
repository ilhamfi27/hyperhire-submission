import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/domains/user.service';
import { AuthResponseDTO, LoginUserDTO } from '../application/dto/auth.dto';
import { verify } from 'src/shared/utils/auth';
import { JWT_SECRET } from 'src/shared/constants/global.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDTO: LoginUserDTO): Promise<AuthResponseDTO> {
    const userData = await this.userService.findUser({
      username: loginUserDTO.username,
    });

    if (!userData) {
      throw new UnauthorizedException();
    }

    const isMatch = await verify(loginUserDTO.password, userData.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: userData.id,
      password: undefined,
      username: userData.username,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      user: payload,
      accessToken: accessToken,
    };
  }
  async verify(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: JWT_SECRET,
    });
  }
}
