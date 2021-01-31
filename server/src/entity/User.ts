import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';

// extends base entity active record to be refer
@ObjectType()
@Entity('users')
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    email: string;

    // @Field() // not exposed
    @Column()
    password: string;

    @Column('int', { default: 0 })
    tokenVersion: number;
}
