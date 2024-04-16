import {
    Entity,
    Unique,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn
} from 'typeorm';
import Collection from './Collection.js';
import Bid from './Bid.js';

@Entity('users')
@Unique(['email'])
class User extends BaseEntity {

    constructor(
        id: string,
        email: string,
        password: string,
        created_at: Date,
        updated_at: Date,

        collections: Collection[],
        bids: Bid[]
    ) {
        super();
        this.id = id;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;

        /* Relations */
        this.collections = collections;
        this.bids = bids
    };

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255 })
    email: string;

    @Column({ type: "varchar", length: 255 })
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /* Relations */
    @OneToMany(
        () => Collection,
        (collection: Collection) => collection.owner
    )
    @JoinColumn()
    collections: Collection[];

    @OneToMany(
        () => Bid,
        (bid: Bid) => bid.user
    )
    @JoinColumn()
    bids: Bid[]
};

export default User;