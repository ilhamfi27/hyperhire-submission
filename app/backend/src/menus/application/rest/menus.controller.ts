import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';
import { MenusService } from 'src/menus/domains/menus.service';
import { RequireAuth } from 'src/auth/decorator/auth.user.decorator';
import { ApiBody } from '@nestjs/swagger';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @ApiBody({ type: CreateMenuDto })
  @RequireAuth()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateMenuDto })
  @RequireAuth()
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @RequireAuth()
  remove(@Param('id') id: string) {
    return this.menusService.remove(id);
  }
}
