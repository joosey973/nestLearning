import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Datum } from './entities/datum.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/users.entity';
import { Auth } from '../auth/entities/auth.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Datum) private readonly datumRepository: Repository<Datum>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>) { };
  
  async preValidate(headers: Record<string, string>): Promise<number> {
    const access = await this.authRepository.findOneBy({accessKey: headers['x-user-access-key']})
    if (access === null) throw new BadRequestException("Вы не авторизованы!");
    return access.user_id;
  }

  async findDataAndValidate(headers: Record<string, string>, id: number): Promise<Datum> {
    const userId = await this.preValidate(headers);
    const dataObj = await this.datumRepository.findOneBy({id: id})
    if (dataObj === null) throw new NotFoundException("Нет данных под этим id");
    if (userId !== dataObj.user_id) throw new BadRequestException("Вы не имеете доступа к этим данным!");
    return dataObj
  }


  async create(headers: Record<string, string>, createDatumDto: CreateDatumDto): Promise<void> {
    const userId = await this.preValidate(headers);
    const res = await this.datumRepository.create({
      user_id: userId,
      data: createDatumDto.data
    })

    await this.datumRepository.save(res);
  }

  async findAll(headers: Record<string, string>): Promise<Datum[]> {
    const userId = await this.preValidate(headers);
    const res = await this.datumRepository.findBy({user_id: userId})
    return await this.datumRepository.save(res);
  }

  async findOne(headers: Record<string, string>, id: number): Promise<Datum> {
    return this.findDataAndValidate(headers, id);
  }

  async update(headers: Record<string, string>, id: number, updateDatumDto: UpdateDatumDto): Promise<void> {
    const dataObj = await this.findDataAndValidate(headers, id);
    dataObj.data = updateDatumDto.data;
    await this.datumRepository.save(dataObj);
  }

  async delete(headers: Record<string, string>, id: number): Promise<void>{
    const dataObj = await this.findDataAndValidate(headers, id);
    await this.datumRepository.delete({id: dataObj.id})
  }
}
