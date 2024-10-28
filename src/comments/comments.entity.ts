import { Cards } from "src/cards/cards.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id_comment: number

    @ManyToOne(() => Cards, (card) => card.comments, { onDelete: "CASCADE" })
    fk_card: Cards

    @Column()
    text: string
}