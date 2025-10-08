//@ts-nocheck
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * An Entity for Object Rleation Mapping.
 * (Helpls to map the data of TypeScript/Javascript Objects 
 * to a database model.)
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    username:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    sessionId:string;
 
    // constructor(name:string, username:string, email:string, password:string, sessionId:string)
    // {
    //    this.name = name
    //    this.username = username
    //    this.email = email
    //    this.password = password
    //    this.sessionId = sessionId
    // }
 }