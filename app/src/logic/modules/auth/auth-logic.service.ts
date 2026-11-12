import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsersDataService } from '../../../data/modules/users/users-data.service';
import { AuthDataService } from '../../../data/modules/auth/auth-data.service';
import { Auth } from '../../../data/modules/auth/entities/auth.entity';

@Injectable()
export class AuthLogicService {
  constructor(
    @Inject(AuthDataService) private readonly authDataService: AuthDataService,
    @Inject(UsersDataService) private readonly usersDataService: UsersDataService,
) { };

  async create(login: string, password: string): Promise<Auth> {
    const user = await this.usersDataService.getUserByEmail(login);
    if (user === null) throw new NotFoundException("Такой пользователь не зарегестрирован!");
    if (user.password !== password) throw new BadRequestException("Неверно указан пароль");

    return this.authDataService.create(user.id);
  }
}
