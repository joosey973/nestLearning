import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsEmail({}, {message: "Некорректно указана почта"})
    @IsNotEmpty({ message: 'Почта не может быть пустой' })
    email: string;

    @IsString({message: "Некорректно указано имя"})
    @IsNotEmpty({ message: 'Имя не может быть пустым' })
    name: string;


    @IsString({message: 'Пароль должен быть строкой'})
    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    password: string;
}
