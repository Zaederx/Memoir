import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { printFormatted } from 'printformatted-js';
/**
 * Class to perform Mongodb User CRUD opertations
 * Assumes the collection is called users.
 */
class DbUserCrudDriver {
    constructor(uri, dbClusterName) {
        //connect to mongo db
        this.client = new MongoClient(uri);
        this.dbClusterName = dbClusterName; //db name
        //fetch database
        this.database = this.client.db(this.dbClusterName);
    }
    //CREATE
    /**
     * Persists / saves user to mongo db
     * @param name name of the user
     * @param username username of the user
     * @param password password of the user
     * @param email email of the user
     * @param sessionId sessionId of the user
     */
    async addUser(name, username, password, email, sessionId) {
        printFormatted('blue', 'function addUser called');
        printFormatted('yellow', 'name:', name, '\n', 'username:', username, '\n', 'password:', password, '\n', 'email:', email, '\n', 'sessionId:', sessionId);
        var successful;
        var passwordHash = await bcrypt.hash(password, 8);
        const collection = 'users';
        const data = {
            name: name,
            username: username,
            password: passwordHash,
            email: email,
            sessionId: sessionId ? sessionId : '',
        };
        try {
            await this.addData(collection, data);
            successful = true;
            return successful;
        }
        catch (error) {
            printFormatted('red', error);
            successful = false;
            return successful;
        }
    }
    /**
     *
     * @param collection mongo db collection
     * @param data data to be added to the collection
     */
    async addData(collection, data) {
        //find the right collection / column
        var col = this.database.collection(collection);
        //insert new data
        try {
            const result = await col.insertOne(data);
            if (result && result.acknowledged) {
                console.log(`added ${collection} succesfully`);
            }
            else {
                throw new Error(`Problem adding collection '${collection}' with data '${data}' to database`);
            }
        }
        catch (e) {
            printFormatted('red', e);
        }
    }
    //READ
    /**
     * Finds a user by their username.
     * Functions returns a user.
     * @param username username of user to be found
     */
    async findUserByUsername(username) {
        printFormatted('blue', 'function findUserByUsername called');
        printFormatted('yellow', 'username:', username);
        if (username != undefined || username != '') {
            try {
                //find the right collection / column
                const collection = 'users';
                const users = this.database.collection(collection);
                //get user by username
                var query = { username: username };
                const user = await users.findOne(query);
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            printFormatted('red', 'username is blank or undefined');
        }
    }
    /**
     *
     * @param sessionId sessionId as a string
     * @return user
     */
    async findUserBySessionId(sessionId) {
        try {
            const collection = 'users';
            var users = this.database.collection(collection);
            const query = { sessionId: sessionId };
            const user = await users.findOne(query);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }
        catch (e) {
            console.log(e);
        }
    }
    //Update
    /**
     * Updates the user data using their username.
     * @param username username
     * @param data data to be updated in key value pairs
     *
     * i.e. { sessionId : ${sessionId} }
     */
    async updateUserByUsername(username, data) {
        try {
            const collection = 'users';
            var users = this.database.collection(collection);
            var query = { username: username };
            var result = users.updateOne(query, { $set: data, $currentDate: { lastUpdated: true } });
        }
        catch (error) {
            printFormatted('red', error);
        }
    }
    /**
     * Updates the user data using their username.
     * @param username username
     * @param data data to be updated in key value pairs
     *
     * i.e. { sessionId : ${sessionId} }
     */
    async updateUserBySessionId(sessionId, data) {
        try {
            const collection = 'users';
            var users = this.database.collection(collection);
            var query = { sessionId: sessionId };
            var result = users.updateOne(query, { $set: data, $currentDate: { lastUpdated: true } });
        }
        catch (error) {
            printFormatted('red', error);
        }
    }
    /**
     * Deletes a user that matched the specified conditions in the query.
     * Usage example:
     * ```
     * const query = {username: 'username1'}
     * await deleteUser(query)
     * ```
     * @param query the conditions of finding a specificed user
     */
    async deleteUser(query) {
        const collection = 'users';
        const col = this.database.collection(collection);
        try {
            const result = await col.deleteOne(query);
            if (result.deletedCount === 1) {
                console.log(`successfully deleted 1 user`);
                return result;
            }
            else {
                throw new Error('No users matched the query');
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    async deleteUserByUsername(username) {
        var query = { username: username };
        var result = await this.deleteUser(query);
        return result;
    }
}
export default DbUserCrudDriver;
