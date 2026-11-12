import { Controller, Post, Body } from '@nestjs/common';
import { AuthHttpService } from '../services/auth-http.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { Auth } from '../../../../data/modules/auth/entities/auth.entity';

@Controller('/api/v1/auth')
export class AuthHttpController {
  constructor(private readonly authHttpService: AuthHttpService) {}

  @Post()
  async create(@Body() createAuthDto: CreateAuthDto): Promise<Auth> {
    return this.authHttpService.create(createAuthDto);
  }
}
