import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import User from './User.js';
import Bid from './Bid.js';

@Entity('collections')
class Collection extends BaseEntity {

    constructor(
        id: number,
        name: string,
        description: string,
        stocks: number,
        price: number,
        created_at: Date,
        updated_at: Date,


        owner: User,
        bids: Bid[]
    ) {
        super();
        this.id = id;
        this.name = name;
        this.description = description;
        this.stocks = stocks;
        this.price = price;
        this.created_at = created_at;
        this.updated_at = updated_at;

        /* Relations */
        this.owner = owner;
        this.bids = bids;
    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "float" })
    stocks: number;

    @Column({ type: "float" })
    price: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /* Relations */
    @ManyToOne(
        () => User,
        (user: User) => user.collections
    )
    owner: User;

    @OneToMany(
        () => Bid,
        (bid: Bid) => bid.collection
    )
    @JoinColumn()
    bids: Bid[]

};

export default Collection;