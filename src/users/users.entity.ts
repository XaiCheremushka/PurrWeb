import { Columns } from 'src/columns/columns.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Columns, (column) => column.fk_user)
    columns: Columns[];  // Список колонок, связанных с пользователем
}