import { Injectable ,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Multer } from 'multer';
import * as fs from 'fs'; 
import { CreateUserDto } from './dto/UserDo';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto, file: Multer.File): Promise<User> {
    const user = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;

    const uploadsDir = './uploads';
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    if (file) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const filePath = `${uploadsDir}/${fileName}`;
      await fs.promises.writeFile(filePath, file.buffer);
      user.avatarUrl = filePath;
    }

    return this.userRepository.save(user);
  }
  async findById(id: number): Promise<User> {
    return this.userRepository.findOne({where:{id}});
  }


  async listUsers(): Promise<any[]> {
    const users = await this.userRepository.find();
    return users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
    }));
  }

  
}
