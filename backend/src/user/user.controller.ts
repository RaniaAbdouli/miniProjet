import { Controller, Post, Body, UploadedFile, UseInterceptors,Param, Res,Get, NotFoundException  } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer'; 
import { CreateUserDto } from './dto/UserDo';
import { Response } from 'express';
import * as path from 'path'; // Importer le module path


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Multer.File): Promise<{ message: string, user: User }> {
    const createdUser = await this.userService.create(createUserDto, file);
    return { message: 'User created successfully', user: createdUser };
  }

  @Get(':id/avatar')
  async getUserAvatar(@Param('id') id: number, @Res() res: Response) {
    const user = await this.userService.findById(id);
    if (!user || !user.avatarUrl) {
      throw new NotFoundException('User avatar not found');
    }

    const absoluteFilePath = path.resolve(user.avatarUrl);
    res.sendFile(absoluteFilePath);
  }

  @Get()
  async listUsers() {
    return this.userService.listUsers();
  }
}


