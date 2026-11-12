import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Datum } from './entities/datum.entity';
import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/browser';

@Injectable()
export class DatumDataService {
    constructor(@InjectRepository(Datum) private readonly datumRepository: Repository<Datum>) { };

    async create(userId: number, data: Partial<Datum>): Promise<Datum> {
        const user = await this.datumRepository.create({
            user_id: userId,
            data: data,
        });
        return await this.datumRepository.save(user);
    }

    async findAll(userId: number): Promise<Datum[]> {
        return await this.datumRepository.findBy({user_id: userId});
    }

    async findOne(id: number): Promise<Datum | null> {
        return await this.datumRepository.findOneBy({id: id});
    }

    async update(dataObj: Datum): Promise<Datum> {
        return this.datumRepository.save(dataObj)
    }

    async delete(id: number): Promise<boolean> {
        const res = await this.datumRepository.delete(id);
        return (res.affected ?? 0) > 0;
    }
}
