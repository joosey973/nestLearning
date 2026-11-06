import { Controller, Get, Post, Param, ParseIntPipe, Body } from '@nestjs/common';
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
        return this.usersService.createUser(body.name);
    }

}
