import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity(User.TABLE_NAME)
export class User {

    public static TABLE_NAME = 'user';

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        name: 'name',
        length: 50,
        nullable: false,
        unique: false,
    })
    public name: string;

    @Column({
        name: 'last_name',
        length: 50,
        nullable: false,
        unique: false,
    })
    public lastName: string;
}
