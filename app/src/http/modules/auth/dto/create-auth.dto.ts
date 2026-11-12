import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAuthDto {
    @IsString({message: 'Логин должен быть строкой'})
    @IsEmail({}, {message: 'Некорректный логин'})
    @IsNotEmpty({ message: 'Логин не может быть пустым' })
    login: string;

    @IsString({message: 'Пароль должен быть строкой'})
    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    password: string;
}
