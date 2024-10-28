import { Cards } from "src/cards/cards.entity";
import { Users } from "src/users/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Columns {
    @PrimaryGeneratedColumn()
    id_column: number;

    @ManyToOne(() => Users, (user) => user.columns, { onDelete: 'CASCADE' })
    fk_user: Users; // Внешний ключ, ссылающийся на модель User

    @Column()
    title: string;

    @OneToMany(() => Cards, (card) => card.fk_column)
    cards: Cards[];

}