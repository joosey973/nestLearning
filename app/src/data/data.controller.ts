import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, ParseIntPipe, Head } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDatumDto } from './dto/create-datum.dto';
import { UpdateDatumDto } from './dto/update-datum.dto';
import { Datum } from './entities/datum.entity';

@Controller('/api/v1/data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  create(@Headers() headers: Record<string, string>, @Body() createDatumDto: CreateDatumDto) {
    return this.dataService.create(headers, createDatumDto);
  }

  @Get()
  async findAll(@Headers() headers: Record<string, string>): Promise<Datum[]> {
    return this.dataService.findAll(headers);
  }

  @Get(':id')
  async findOne(@Headers() headers: Record<string, string>, @Param('id', ParseIntPipe) id: number): Promise<Datum> {
    return this.dataService.findOne(headers, id);
  }

  @Patch(':id')
  async update(@Headers() headers: Record<string, string>, @Param('id', ParseIntPipe) id: number, @Body() updateDatumDto: UpdateDatumDto): Promise<void> {
    return this.dataService.update(headers, id, updateDatumDto);
  }

  @Delete(':id')
  async delete(@Headers() headers: Record<string, string>, @Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.dataService.delete(headers, id);
  }
}
