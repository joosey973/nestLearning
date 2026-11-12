import { IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @IsEmail({}, {message: "Некорректно указана почта"})
    email: string;

    @IsString({message: "Некорректно указана почта"})
    name: string;


    @IsString({message: 'Пароль должен быть строкой'})
    password: string;
}
