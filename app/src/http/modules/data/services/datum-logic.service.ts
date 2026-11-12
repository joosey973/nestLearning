import { Inject, Injectable } from '@nestjs/common';
import { DatumLogicService } from '../../../../logic/modules/data/datum-logic.service';
import { Datum } from '../../../../data/modules/data/entities/datum.entity';
import { CreateDatumDto } from '../dto/create-datum.dto';
import { UpdateDatumDto } from '../dto/update-datum.dto';

@Injectable()
export class DatumHttpService {
    constructor(@Inject(DatumLogicService) private readonly datumLogicService: DatumLogicService) { };

    async findAll(headers: Record<string, string>): Promise<Datum[]> {
        return await this.datumLogicService.findAll(headers);
    }

    async findOne(headers: Record<string, string>, id: number): Promise<Datum | null> {
        return await this.datumLogicService.findOne(headers, id);
    }

    async create(headers: Record<string, string>, dto: CreateDatumDto): Promise<Datum> {
        return await this.datumLogicService.create(headers, dto.data);
    }

    async update(headers: Record<string, string>, id: number, dto: UpdateDatumDto): Promise<Datum> {
        return await this.datumLogicService.update(headers, id, dto);
    }

    async delete(headers: Record<string, string>, id: number): Promise<boolean> {
        return await this.datumLogicService.delete(headers, id);
    }
}
