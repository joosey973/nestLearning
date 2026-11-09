import { Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserRetType, UserCType, UserUType } from './users.types';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){};

    @Get()
    getAllUsers(): Promise<string[]> {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) userId: number): Promise<string> {
        return this.usersService.getUserById(userId);
    }

    @Get('by-name/:name')
    getUserByName(@Param('name') name: string): Promise<string> {
        return this.usersService.getUserByName(name);
    }


    @Post()
    createUser(@Body() body: UserCType): Promise<UserRetType> {
        return this.usersService.createUser(body);
    }

    @Patch(':id')
    updateUser(@Body() body: UserUType, @Param("id", ParseIntPipe) userId: number): Promise<UserRetType> {
        return this.usersService.updateUser(userId, body);
    }

    @Delete(":id")
    deleteUser(@Param("id", ParseIntPipe) userId: number): Promise<UserRetType> {
        return this.usersService.deleteUser(userId);
    }
}
