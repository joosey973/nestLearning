import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('auth')
export class Auth {
    @PrimaryColumn({type: 'int', unique: true})
    user_id: number;

    @Column({type: 'uuid', unique: true})
    accessKey: string;
}
