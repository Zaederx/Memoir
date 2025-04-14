/*
 * - login
 * - logout
 * - signup
 */

export class User {
    name:string
    username:string
    email:string
    password:string
    sessionId:string
 
    constructor(name:string, username:string, email:string, password:string, sessionId:string)
    {
       this.name = name
       this.username = username
       this.email = email
       this.password = password
       this.sessionId = sessionId
    }
 }