import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Datum } from '../../../data/modules/datum/entities/datum.entity';
import { AuthDataService } from '../../../data/modules/auth/auth-data.service';
import { DatumDataService } from '../../../data/modules/datum/datum-data.service';

@Injectable()
export class DatumLogicService {
    constructor(
        @Inject(DatumDataService) private readonly datumDataService: DatumDataService,
        @Inject(AuthDataService) private readonly authDataService: AuthDataService
    ) { };

    async getUserIdOrError(accessKey: string): Promise<number> {
        const access = await this.authDataService.getById(accessKey);
        if (access === null) throw new BadRequestException("Вы не авторизованы!");
        return access.user_id;
    }

    async getDataOrError(accessKey: string, id: number): Promise<Datum> {
        const userId = await this.getUserIdOrError(accessKey);
        const dataObj = await this.datumDataService.findOne(id);
        if (dataObj === null) throw new NotFoundException("Нет данных под этим id");
        if (userId !== dataObj.user_id) throw new BadRequestException("Вы не имеете доступа к этим данным!");
        return dataObj
    }

    async findAll(accessKey: string): Promise<Datum[]> {
        const userId = await this.getUserIdOrError(accessKey);
        return await this.datumDataService.findAll(userId);
    }

    async findOne(accessKey: string, id: number): Promise<Datum | null> {
        return await this.getDataOrError(accessKey, id);
    }

    async create(accessKey: string, data: Partial<Datum>): Promise<Datum> {
        const userId = await this.getUserIdOrError(accessKey);
        return await this.datumDataService.create(userId, data);
    }

    async update(accessKey: string, id: number, data: Partial<Pick<Datum, 'data'>>,): Promise<Datum> {
        const dataObj = await this.getDataOrError(accessKey, id)
        if (data.data !== undefined && typeof data.data !== 'function') {
            dataObj.data = data.data;
        }

        return await this.datumDataService.update(dataObj);
    }

    async delete(accessKey: string, id: number): Promise<boolean> {
        await this.getDataOrError(accessKey, id);
        return await this.datumDataService.delete(id);
    }
}
