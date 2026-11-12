import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthDataService {
  constructor(@InjectRepository(Auth) private readonly authRepository: Repository<Auth>) { };

  async create(userId: number): Promise<Auth> {
    const access = await this.authRepository.create({
      user_id: userId,
      accessKey: randomUUID()
    })

    return await this.authRepository.save(access);;
  }

  async getById(accessKey: string): Promise<Auth | null> {
    return await this.authRepository.findOneBy({ accessKey: accessKey });
  }
}
