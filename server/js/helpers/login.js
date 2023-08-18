//@ts-ignore
import path from 'path';
import { config as dotEnvConfig } from 'dotenv';
import crudDriver from '../db/db.js';
import bcrypt from 'bcryptjs';
import { printFormatted } from 'printformatted-js';
//get access to env file variables
const envFilePath = path.join('..', 'demo.env'); //only accepts relative path
dotEnvConfig({ path: envFilePath });
//get mongodb paassword and uri
//@ts-ignore
const password = process.env.DATABASE_PASSWORD;
const uri = `mongodb+srv://memoir-cluster:${password}@memoir-cluster.g4ldqzg.mongodb.net/?retryWrites=true&w=majority`;
//create a new 
var db_driver = new crudDriver(uri, 'memoir');
export async function authenticateCredentials(username, password) {
    try {
        //open connection to db
        db_driver.openConnection();
        //find user
        var user = await db_driver.findUserByUsername(username);
        //close connection
        db_driver.closeConnection();
        if (!user)
            throw new Error('No user found');
        printFormatted('yellow', 'user:', user);
        //if password match...
        if (await bcrypt.compare(password, user?.password)) {
            //login
            return true;
        }
        else {
            return false;
        }
    }
    catch (e) {
        console.log(e);
    }
    return false;
}
