import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('datum')
export class Datum {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    user_id: number;

    @Column({type: 'jsonb'})
    data: Record<string, unknown>;
}
