import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      where: { deletedAt: null },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id, deletedAt: null },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
