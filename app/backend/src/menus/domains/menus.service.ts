import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from '../application/dto/create-menu.dto';
import { UpdateMenuDto } from '../application/dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}
  create(createMenuDto: CreateMenuDto) {
    return this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  findAll() {
    return this.prisma.menu.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.menu.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    console.log('updateMenuDto', updateMenuDto);
    return this.prisma.menu.update({
      where: {
        id,
      },
      data: updateMenuDto,
    });
  }

  remove(id: string) {
    return this.prisma.menu.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
