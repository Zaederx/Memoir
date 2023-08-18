import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import { config as dotEnvConfig } from 'dotenv';
import { createSessionCookie, findCookie, findCookieAttribute } from 'simplycookie-js';
import { v4 as uuidv4 } from 'uuid';
import crudDriver from './db/db.js';
import { authenticateCredentials } from './helpers/login.js';
// import * as url from 'url';
//@ts-ignore
import path from 'path';
import { printFormatted, printFormattedv2 } from 'printformatted-js';
const server = express();
// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
//allows you to use .env file for additional env variables
const envFilePath = path.join('..', 'demo.env'); //only accepts relative path
console.log('\n', `envFilePath:${envFilePath}`);
dotEnvConfig({ path: envFilePath });
//@ts-ignore
const PORT = process.env.PORT;
const dbPassword = process.env.DATABASE_PASSWORD;
const uri = `mongodb+srv://memoir-cluster:${dbPassword}@memoir-cluster.g4ldqzg.mongodb.net/?retryWrites=true&w=majority`;
const db_driver = new crudDriver(uri, 'memoir');
const clientDOMAIN = 'https://localhost:5173';
var csrfProtection = csrf({ cookie: true });
server.use(cors({
    credentials: true,
    origin: clientDOMAIN
}));
server.use(bodyParser.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded
// server.use(multer.array());//for parsing multipart form data
server.use(bodyParser.json());
server.use(cookieParser()); //for parsing cookies
server.use(csrfProtection);
server.disable('x-powered-by'); //remove defualt express header ad
server.listen(PORT, () => {
    var message = '\n' + `Server listening on port:${PORT}`;
    console.log(message);
});
server.get('/csrf-token', (req, res) => {
    //set access control origin
    const name = 'Access-Control-Allow-Origin'; //
    const value = clientDOMAIN; //clientDOMAIN
    res.setHeader(name, value);
    //set access control credentials
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    //set csrf cookie
    // const cookieName = 'csrfToken'
    // const cookieValue = req.csrfToken()
    // var cookie = getAppCookie(cookieName,cookieValue,'localhost')
    // res.setHeader('Set-Cookie', [cookie.getCookieStr()])
    // cookie.print()
    //also add it in in the json for retrieval in js - needed to insert into meta tag
    return res.json({ csrfToken: req.csrfToken() });
});
//Note res true means that the action of
//the server was succesfully carried out
/*
 * - login
 * - logout
 * - signup
 */
server.post('/login', async (req, res) => {
    printFormatted('blue', 'response handler for "/login" called');
    var username = req.body.username;
    var password = req.body.password;
    printFormatted('yellow', 'username:', username, '\npassword:', password);
    try {
        db_driver.openConnection();
        var valid = await authenticateCredentials(username, password);
        //if valid return session cookie
        if (valid) {
            const name = 'memoir-session';
            const value = uuidv4(); //sessionId
            const domain = 'localhost';
            var cookie = createSessionCookie(name, value, domain);
            printFormatted('yellow', 'session cookie:', cookie.getCookieStr());
            res.setHeader('Set-Cookie', cookie.getCookieStr());
            //update user session id
            db_driver.updateUserByUsername(username, { sessionId: value });
            res.send({ res: true, message: 'User credentials were valid' });
        }
        else {
            res.send({ res: false, message: 'User credentials were invalid' });
        }
    }
    catch (error) {
        res.send({ res: false, message: 'Problem logging in:' + error });
        printFormatted('red', error);
    }
    finally {
        db_driver.closeConnection();
    }
});
/**
 * Returns a session id from the session cookie
 * on the request object
 * @param req the express request object
 */
function getSessionIdFromReq(req) {
    var allCookiesStr = req.headers.cookie;
    var asArr = false;
    //find the cookie out all all cookies
    printFormattedv2(true, false, 'yellow', allCookiesStr);
    var cookieStr = findCookie(allCookiesStr, 'memoir-session', asArr);
    printFormatted('yellow', 'cookieStr:', cookieStr);
    try {
        //obtain the session id
        var [sessionId, cookieObj] = findCookieAttribute(cookieStr, 'memoir-session');
        return sessionId;
    }
    catch (error) {
        printFormattedv2(true, false, 'yellow', error);
    }
    return '';
}
//Note res true means that the action of
//the server was succesfully carried out
/*
 * - login
 * - logout
 * - signup
 */
server.post('/login-session-cookie', async (req, res) => {
    printFormatted('blue', 'response handler for "/login-session-cookie" called');
    var sessionId = getSessionIdFromReq(req);
    printFormattedv2(false, false, 'yellow', 'sessionId', sessionId);
    //open db connection
    db_driver.openConnection();
    if (sessionId != '') {
        //authorise user to access application
        var user = await db_driver.findUserBySessionId(sessionId);
        try {
            var valid = await authenticateCredentials(user?.username, user?.password);
            //if valid return new auth cookie
            if (valid) {
                //set new session cookie
                const name = 'memoir-session';
                const value = uuidv4(); //sessionId
                const domain = 'localhost';
                var cookie = createSessionCookie(name, value, domain);
                printFormatted('yellow', 'session cookie:', cookie.getCookieStr());
                res.setHeader('Set-Cookie', cookie.getCookieStr());
                //update session id
                const data = { sessionId: value };
                db_driver.updateUserByUsername(user?.username, data);
                //send response
                res.send({ res: true, message: 'User credentials were valid. User session ID updated.' });
            }
            else {
                res.send({ res: false, message: 'User credentials were invalid.' });
            }
        }
        catch (error) {
            res.send({ res: false, message: 'Problem logging in:' + error });
            printFormatted('red', error);
        }
        finally {
            //close db connection
            db_driver.closeConnection();
        }
    }
});
server.get('/logout', async (req, res) => {
    printFormatted('blue', 'response handler "/logout" called');
    try {
        //open connection
        db_driver.openConnection();
        //set session cookie to null
        const name = 'memoir-session';
        const domain = 'localhost';
        var cookie = createSessionCookie(name, null, domain);
        printFormatted('yellow', 'session cookie:', cookie.getCookieStr());
        //set in header
        res.setHeader('Set-Cookie', cookie.getCookieStr());
        //update session id
        const data = { sessionId: null };
        const currentSessionId = getSessionIdFromReq(req);
        db_driver.updateUserBySessionId(currentSessionId, data);
        //and return to client wiht res true
        res.send({ res: true });
    }
    catch (error) {
        printFormattedv2(true, true, 'red', 'Problem logging out:', error);
    }
    finally {
        db_driver.closeConnection();
    }
});
server.post('/sign-up', async (req, res) => {
    db_driver.openConnection();
    printFormatted('blue', 'response handler "/sign-up" called');
    const name = req.body.name;
    const email = req.body.email;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    const username = req.body.username;
    const sessionId = uuidv4(); //unique id
    //print request body parameters
    printFormatted('yellow', 'name:', name, '\n', 'email:', email, '\n', 'password1:', password1, '\n', 'password2:', password2, '\n', 'username:', username, '\n', 'sessionId:', sessionId);
    if (password1 != password2) {
        res.send({
            res: false,
            message: 'Passwords do not match.'
        });
    }
    try {
        const userExists = await authenticateCredentials(username, password1);
        if (userExists) {
            res.send({
                res: false,
                message: 'User already exists'
            });
            throw new Error('User Already Exists.');
        }
        else {
            //create user in db
            await db_driver.addUser(name, username, password1, email, sessionId);
            //send response to confirm successful
            res.send({
                res: true,
                message: 'user added successfully'
            });
        }
    }
    catch (error) {
        printFormatted('red', 'Error adding user to database:', error);
    }
    finally {
        db_driver.closeConnection();
    }
});
