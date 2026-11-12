import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Datum } from '../../../data/modules/data/entities/datum.entity';
import { AuthDataService } from '../../../data/modules/auth/auth-data.service';
import { DatumDataService } from '../../../data/modules/data/datum-data.service';

@Injectable()
export class DatumLogicService {
    constructor(
        @Inject(DatumDataService) private readonly datumDataService: DatumDataService,
        @Inject(AuthDataService) private readonly authDataService: AuthDataService
    ) { };

    async getUserIdOrError(headers: Record<string, string>): Promise<number> {
        const access = await this.authDataService.getById(headers['x-user-access-key']);
        if (access === null) throw new BadRequestException("Вы не авторизованы!");
        return access.user_id;
    }

    async getDataOrError(headers: Record<string, string>, id: number): Promise<Datum> {
        const userId = await this.getUserIdOrError(headers);
        const dataObj = await this.datumDataService.findOne(id);
        if (dataObj === null) throw new NotFoundException("Нет данных под этим id");
        if (userId !== dataObj.user_id) throw new BadRequestException("Вы не имеете доступа к этим данным!");
        return dataObj
    }

    async findAll(headers: Record<string, string>): Promise<Datum[]> {
        const userId = await this.getUserIdOrError(headers);
        return await this.datumDataService.findAll(userId);
    }

    async findOne(headers: Record<string, string>, id: number): Promise<Datum | null> {
        return await this.getDataOrError(headers, id);
    }

    async create(headers: Record<string, string>, data: Partial<Datum>): Promise<Datum> {
        const userId = await this.getUserIdOrError(headers);
        return await this.datumDataService.create(userId, data);
    }

    async update(headers: Record<string, string>, id: number, data: Partial<Pick<Datum, 'data'>>,): Promise<Datum> {
        const dataObj = await this.getDataOrError(headers, id)
        if (data.data !== undefined && typeof data.data !== 'function') {
            dataObj.data = data.data;
        }

        return await this.datumDataService.update(dataObj);
    }

    async delete(headers: Record<string, string>, id: number): Promise<boolean> {
        await this.getDataOrError(headers, id);
        return await this.datumDataService.delete(id);
    }
}
