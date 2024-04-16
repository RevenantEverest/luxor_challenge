import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from 'typeorm';
import User from './User.js';
import Collection from './Collection.js';

export enum BidStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected"
};

@Entity('bids')
class Bid extends BaseEntity {

    constructor(
        id: number,
        user: User,
        collection: Collection,
        price: number,
        status: BidStatus,
        created_at: Date,
        updated_at: Date
    ) {
        super();
        this.id = id;
        this.user = user;
        this.collection = collection;
        this.price = price;
        this.status = status;
        this.created_at = created_at;
        this.updated_at = updated_at;
    };

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(
        () => User,
        (user: User) => user.bids
    )
    user: User;

    @ManyToOne(
        () => Collection,
        (collection: Collection) => collection.bids
    )
    collection: Collection;

    @Column({
        type: "enum",
        enum: BidStatus
    })
    status: BidStatus;

    @Column({ type: "float" })
    price: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

};

export default Bid;