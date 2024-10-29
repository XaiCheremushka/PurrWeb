import { Columns } from "src/columns/columns.entity"
import { Comments } from "src/comments/comments.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Cards {
    @PrimaryGeneratedColumn()
    id_card: number;

    @ManyToOne(() => Columns, (column) => column.cards, { onDelete: 'CASCADE' })
    fk_column: Columns;

    @Column()
    name: string;

    @OneToMany(() => Comments, (comment) => comment.fk_card)
    comments: Comments[];
}