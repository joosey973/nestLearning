import { Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){};

    @Get()
    getAllUsers(): string[] {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) userId: number): string {
        return this.usersService.getUserById(userId);
    }

    @Get('by-name/:name')
    getUserByName(@Param('name') name: string): string {
        return this.usersService.getUserByName(name);
    }


    @Post()
    createUser(@Body() body: any) {
        return this.usersService.createUser(body);
    }

    @Patch(':id')
    updateUser(@Body() body: any, @Param("id", ParseIntPipe) userId: number) {
        return this.usersService.updateUser(userId, body);
    }

    @Delete(":id")
    deleteUser(@Param("id", ParseIntPipe) userId: number) {
        return this.usersService.deleteUser(userId);
    }
}
