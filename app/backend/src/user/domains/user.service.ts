import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'src/shared/utils/auth';
import awaitToError from 'src/shared/utils/await-to-error';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async init() {
    const defaultUsers: Prisma.UserCreateInput[] = [
      {
        username: 'admin',
        password: await hash('password123!'),
      },
    ];
    const [err, data] = await awaitToError(
      this.prisma.user.findUniqueOrThrow({
        where: {
          username: defaultUsers[0].username,
        },
      }),
    );
    if (err) {
      return this.prisma.user.create({
        data: {
          ...defaultUsers[0],
        },
      });
    }
    return data;
  }

  async findUser(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where,
    });
  }
}
