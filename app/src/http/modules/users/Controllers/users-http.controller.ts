import { Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Body } from '@nestjs/common';
import { UsersHttpService } from '../services/users-http.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../../../../data/modules/users/entities/users.entity';
import { UpdateUserDto } from '../dto/update-user.dto';


@Controller('users')
export class UsersHttpController {
    constructor(private readonly usersHttpService: UsersHttpService){};

    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.usersHttpService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) userId: number): Promise<User | null> {
        return await this.usersHttpService.getUserById(userId);
    }

    @Get('by-name/:name')
    async getUserByName(@Param('name') name: string): Promise<User[]> {
        return await this.usersHttpService.getUserByName(name);
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersHttpService.create(createUserDto);
    }

    @Patch(':id')
    async update(@Body() updateUserDto: UpdateUserDto, @Param("id", ParseIntPipe) userId: number): Promise<boolean> {
        return await this.usersHttpService.update(userId, updateUserDto);
    }

    @Delete(":id")
    async delete(@Param("id", ParseIntPipe) userId: number): Promise<boolean> {
        return await this.usersHttpService.delete(userId);
    }
}
