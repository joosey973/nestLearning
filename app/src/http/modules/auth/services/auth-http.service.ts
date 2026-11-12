import { Inject, Injectable } from '@nestjs/common';
import { AuthLogicService } from '../../../../logic/modules/auth/auth-logic.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { Auth } from '../../../../data/modules/auth/entities/auth.entity';



@Injectable()
export class AuthHttpService {
  constructor(@Inject(AuthLogicService) private readonly authLogicService: AuthLogicService){};

  async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    return this.authLogicService.create(createAuthDto.login, createAuthDto.password);
  }
}
