import { IsObject, IsNotEmpty } from "class-validator";

export class CreateDatumDto {
    @IsObject({ message: 'Поле data должно быть объектом' })
    @IsNotEmpty({message: "Поле не может быть пустым!"})
    data: Record<string, unknown>;
}
