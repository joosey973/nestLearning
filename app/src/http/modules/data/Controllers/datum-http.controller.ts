import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, ParseIntPipe, Head } from '@nestjs/common';
import { DatumHttpService } from '../services/datum-logic.service';
import { CreateDatumDto } from '../dto/create-datum.dto';
import { Datum } from '../../../../data/modules/data/entities/datum.entity';
import { UpdateDatumDto } from '../dto/update-datum.dto';

@Controller('/api/v1/data')
export class DatumHttpController {
  constructor(private readonly datumHttpService: DatumHttpService) {}

  @Post()
  async create(@Headers() headers: Record<string, string>, @Body() createDatumDto: CreateDatumDto) {
    return await this.datumHttpService.create(headers, createDatumDto);
  }

  @Get()
  async findAll(@Headers() headers: Record<string, string>): Promise<Datum[]> {
    return await this.datumHttpService.findAll(headers);
  }

  @Get(':id')
  async findOne(@Headers() headers: Record<string, string>, @Param('id', ParseIntPipe) id: number): Promise<Datum | null> {
    return await this.datumHttpService.findOne(headers, id);
  }

  @Patch(':id')
  async update(@Headers() headers: Record<string, string>, @Param('id', ParseIntPipe) id: number, @Body() updateDatumDto: UpdateDatumDto): Promise<Datum> {
    return await this.datumHttpService.update(headers, id, updateDatumDto);
  }

  @Delete(':id')
  async delete(@Headers() headers: Record<string, string>, @Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return await this.datumHttpService.delete(headers, id);
  }
}
