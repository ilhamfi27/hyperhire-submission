import { API_PREFIX } from '../shared/constants/global.constants';
import { Config } from './config.interface';
import * as dotenv from 'dotenv';

dotenv.config();

export const GLOBAL_CONFIG: Config = {
  nest: {
    port: +(process.env.PORT || 1321),
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Nestjs Prisma Starter',
    description: 'The nestjs API description',
    version: '1.5',
    path: API_PREFIX,
  },
  security: {
    expiresIn: 3600 * 24 * 7, // 7 days
    bcryptSaltOrRound: 10,
  },
};
