import { Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserRetType, UserCType, UserUType } from './users.types';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){};

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) userId: number): Promise<User | null> {
        return this.usersService.getUserById(userId);
    }

    @Get('by-name/:name')
    getUserByName(@Param('name') name: string): Promise<User[]> {
        return this.usersService.getUserByName(name);
    }


    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<UserRetType> {
        return this.usersService.createUser(createUserDto);
    }

    @Patch(':id')
    updateUser(@Body() updateUserDto: UpdateUserDto, @Param("id", ParseIntPipe) userId: number): Promise<UserRetType> {
        return this.usersService.updateUser(userId, updateUserDto);
    }

    @Delete(":id")
    deleteUser(@Param("id", ParseIntPipe) userId: number): Promise<UserRetType> {
        return this.usersService.deleteUser(userId);
    }
}
