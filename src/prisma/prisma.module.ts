import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UsersModule],
  providers: [PrismaService],
})
export class PrismaModule {}
