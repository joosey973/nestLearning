import { Inject, Injectable } from '@nestjs/common';
import { DatumLogicService } from '../../../../logic/modules/data/datum-logic.service';
import { Datum } from '../../../../data/modules/datum/entities/datum.entity';
import { CreateDatumDto } from '../dto/create-datum.dto';
import { UpdateDatumDto } from '../dto/update-datum.dto';

@Injectable()
export class DatumHttpService {
    constructor(@Inject(DatumLogicService) private readonly datumLogicService: DatumLogicService) { };

    async findAll(accessKey: string): Promise<Datum[]> {
        return await this.datumLogicService.findAll(accessKey);
    }

    async findOne(accessKey: string, id: number): Promise<Datum | null> {
        return await this.datumLogicService.findOne(accessKey, id);
    }

    async create(accessKey: string, dto: CreateDatumDto): Promise<Datum> {
        return await this.datumLogicService.create(accessKey, dto.data);
    }

    async update(accessKey: string, id: number, dto: UpdateDatumDto): Promise<Datum> {
        return await this.datumLogicService.update(accessKey, id, dto);
    }

    async delete(accessKey: string, id: number): Promise<boolean> {
        return await this.datumLogicService.delete(accessKey, id);
    }
}
