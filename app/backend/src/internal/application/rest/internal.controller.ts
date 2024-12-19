import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/domains/user.service';

@ApiTags('Internal')
@Controller('internal')
export class InternalController {
  constructor(private readonly userService: UserService) {}

  @Get('/users/init')
  async initUser() {
    return this.userService.init();
  }
}
