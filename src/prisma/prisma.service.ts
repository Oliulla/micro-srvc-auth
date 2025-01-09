import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Prisma connected');
    } catch (error) {
      console.error('Error connecting to Prisma:', error);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('Prisma disconnected');
    } catch (error) {
      console.error('Error disconnecting from Prisma:', error);
    }
  }
}
