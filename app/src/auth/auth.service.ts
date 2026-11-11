import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { };

  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    const user = await this.userRepository.findOneBy({email: createAuthDto.login});
    if (user === null) throw new NotFoundException("Такой пользователь не зарегестрирован!");
    if (user.password !== createAuthDto.password) throw new BadRequestException("Неверно указан пароль");

    const access = await this.authRepository.create({
      user_id: user.id,
      accessKey: randomUUID()
    })

    return await this.authRepository.save(access);;
  }
}
