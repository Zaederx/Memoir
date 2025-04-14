import { printFormattedv2 } from 'printformatted-js';
import { User } from './user.js';
/**
 * A class to store a list of users
 * and perform operations on them.
 */
export class UserList {
   
    users: User[];
    constructor(users: User[]) {
       this.users = users;
    }
 
    /**
     * Finds a user by their session id
     * @param sessionId  the user browser session id
     * @returns the user or null
     */
    findUserBySessionId(sessionId: string): User | null {
       return this.users.find(user => user.sessionId === sessionId) || null;
    }
 
    /**
     * Mocks finding the user by their session id.
     * Will return a users as long as there is as the session id 
     * is a string and not null.
     * @param sessionId 
     * @returns 
     */
    mockFindUserBySessionId(sessionId: string): User | null {
       // Mock implementation for testing
       this.users.forEach(user => {
          if (typeof (user.sessionId) === 'string') {
            const NODE = true
            const TRACE = false
            printFormattedv2(NODE, TRACE, 'yellow', 'Mock user found:', user);
            return user
          }
       })
       return null
    }
 
    /**
     * Adds user to the users list
     * @param user 
     */
    addUser(user: User): void {
       this.users.push(user);
    }
 
    /**
     * Removes a user by their session id
     * @param sessionId 
     * @returns 
     */
    removeUserBySessionId(sessionId: string): boolean {
       const index = this.users.findIndex(user => user.sessionId === sessionId);
       if (index !== -1) {
          this.users.splice(index, 1);
          return true;
       }
       return false;
    }
 
    /**
     * Updates a user by their id
     * @param userId the id of the user 
     * @param data the partial user data to be updated
     * @returns 
     */
    updateUserByUserId (userId: string, data: Partial<User>): boolean {
       const user = this.users.find(user => user.username === userId);
       if (user) {
          Object.assign(user, data);
          return true;
       }
       return false;
    }
 
    /**
     * Update a user by their username
     * @param username 
     * @param data 
     * @returns boolean
     */
    updateUserByUsername(username: any, data: Partial<User>) {
       const user = this.users.find(user => user.username === username);
       if (user) {
          Object.assign(user, data);
          return true;
       }
       return false;
    }
 }