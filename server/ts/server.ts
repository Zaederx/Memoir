import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csrf from 'csurf'
import { config as dotEnvConfig } from 'dotenv'
import { Cookie, createSessionCookie, findCookie, findCookieAttribute } from 'simplycookie-js'
import { v4 as uuidv4 } from 'uuid';
import crudDriver from './db/db.js'
import { User } from './db-entities/user.js';
import { UserList } from './helpers/userList.js';
import bcrypt from 'bcrypt';
import { printFormatted } from 'printformatted-js';
// import * as url from 'url';
//@ts-ignore
import path from 'path'
import { DataSource } from "typeorm"

//bcryot salt const
const saltRounds = 10
//SECTION Databse Setup

//database settings
export const database = new DataSource({
   type: 'sqlite',
   database: '../db/db.sqlite',
   synchronize: true,//true if you want it to load the db from scratch every time
   entities: [
      'db-entities/**.ts'
   ]
})

//initialise database
database.initialize().then(()=> {
   console.log("Database connected")
}).catch((error) => {
   console.log(error)
})

//add test user to database
const userRepository = database.getRepository(User)

var user1 = new User()
user1.name = 'User1 User1'
user1.email = 'email@email.com'
user1.username = 'username'
var password = 'password'
//save password and save user
bcrypt.hash(password, saltRounds, async (error:any, hash:string) => {
   if (error) {
      printFormatted('red', 'Error hashing password:',error)
   }
   user1.passwordHash = hash
   try {
      await userRepository.save(user1)
   }
   catch (error){
      printFormatted('red', 'Problem storing user in database:', error)
   }
})



//example usage of repository / finding people in db
//const allUsers = await userRepository.find()
//const firstUser = await userRepository.findOneBy({
//    id: 1,
//})
// const timber = await userRepository.findOneBy({
//     firstName: "Timber",
//     lastName: "Saw",
// }) // find by firstName and lastName

// await userRepository.remove(timber)

//SECTION - SERVER Settings
const server = express();

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
//allows you to use .env file for additional env variables
const envFilePath = path.join('..', 'demo.env')//only accepts relative path
console.log('\n',`envFilePath:${envFilePath}`)
dotEnvConfig({ path: envFilePath })
//@ts-ignore
const PORT = process.env.PORT
const dbPassword = process.env.DATABASE_PASSWORD
// const uri = `mongodb+srv://memoir-cluster:${dbPassword}@memoir-cluster.g4ldqzg.mongodb.net/?retryWrites=true&w=majority`; //this cluster has been retired - now only paid plans exist on mongodb
//need to find new database for the project
// const db_driver = new crudDriver(uri,'memoir')


const clientDOMAIN = 'https://localhost:5173'

var csrfProtection = csrf({cookie:true})
server.use(cors(
   {
       credentials:true,
       origin: clientDOMAIN
   }
))
server.use(bodyParser.urlencoded({ extended:true }))//for parsing application/x-www-form-urlencoded
// server.use(multer.array());//for parsing multipart form data
server.use(bodyParser.json())
server.use(cookieParser())//for parsing cookies
server.use(csrfProtection)

server.disable('x-powered-by')//remove defualt express header ad
server.listen(PORT, () => {
   var message =  '\n'+`Server listening on port:${PORT}`
   console.log(message)
})




//SECTION - handlers for requests

/**
 * The end point for retrieving csrf tokens
 */
server.get('/csrf-token', (req:any, res:any) => {
   //set access control origin
   const name = 'Access-Control-Allow-Origin'//
   const value:string = clientDOMAIN//clientDOMAIN
   res.setHeader(name,value)
   //set access control credentials
   res.setHeader('Access-Control-Allow-Credentials','true')
   //set csrf cookie
   // const cookieName = 'csrfToken'
   // const cookieValue = req.csrfToken()
   // var cookie = getAppCookie(cookieName,cookieValue,'localhost')
   // res.setHeader('Set-Cookie', [cookie.getCookieStr()])
   // cookie.print()

   //also add it in in the json for retrieval in js - needed to insert into meta tag
   return res.json({csrfToken:req.csrfToken()})
})


async function authenticateUserCredentials(username: string, password: string): Promise<boolean> {
   // Mock implementation for user authentication
   var user:User|null = await userRepository.findOneBy({
      username:username
   })
   //IMPORTANT - Complete with new SQLite DB and TypeORM mappings
   var authenticated:boolean = false
   if (user) {
      bcrypt.compare(password, user.passwordHash, (error, result) => {
         printFormatted('red', "Problem authenticating password. Password probably do not match:", error)
         authenticated = result
      })
   }
   else {
      printFormatted('red', 'No user found with username:', username)
   }
   return authenticated
}

//Note res true means that the action of
//the server was succesfully carried out
/*
 * - login
 * - logout
 * - signup
 */
server.post('/login', async (req: any, res: any) => {
   printFormatted('blue', 'response handler for "/login" called')
   var username = req.body.username
   var password = req.body.password
   printFormatted('yellow', 'username:',username, '\npassword:',password)
   
   try 
   {
      // db_driver.openConnection()
      // var valid =  await db_driver.authenticateCredentials(username, password)
      var valid = await authenticateUserCredentials(username, password)
      //if valid return session cookie
      if (valid) 
      {
         const name = 'memoir-session'
         const value = uuidv4()//sessionId
         const domain = 'localhost'
         var cookie:Cookie = createSessionCookie(name, value, domain)
         printFormatted('yellow', 'session cookie:',cookie.getCookieStr())
         res.setHeader('Set-Cookie',cookie.getCookieStr())
         //update user session id
         // db_driver.updateUserByUsername(username, {sessionId:value})
         users.updateUserByUsername(username, {sessionId:value})
         res.send({res:true, message:'User credentials were valid'})
      }
      else
      {
         res.send({res:false, message:'User credentials were invalid'})
      }
   } catch (error) 
   {
      res.send({res:false, message:'Problem logging in:'+error})
      printFormatted('red', error)
   }
   finally
   {
      // db_driver.closeConnection()
   }
   
})

/**
 * Returns a session id from the session cookie
 * on the request object
 * @param req the express request object
 */
function getSessionIdFromReq(req:any)
{
   var allCookiesStr = req.headers.cookie
   var asArr = false
   //find the cookie out all all cookies
   
   const NODE = false
   const TRACE = false
   printFormatted('yellow', 'allCookiesStr:', allCookiesStr)

   var cookieStr = findCookie(allCookiesStr, 'memoir-session', asArr) as string
   printFormatted('yellow', 'cookieStr:',cookieStr)

   if (cookieStr == '' || cookieStr == undefined) { return ''}
   try
   {
      //obtain the session id
      var [sessionId, cookieObj] = findCookieAttribute(cookieStr, 'memoir-session');//returns 
      return sessionId;
   }
   catch(error)
   {
      printFormatted('yellow', error)
   }
   return ''
}

//Note res true means that the action of
//the server was succesfully carried out




// var user1 = new User("name", "username", "email@email.com", "password", "sessionId")
// var users:UserList = new UserList([user1])

/**
 * For logging in via the session cookie
 */
server.post('/login-session-cookie', async (req: any, res: any) => {
   printFormatted('blue', 'response handler for "/login-session-cookie" called')

   var sessionId = getSessionIdFromReq(req)//returns an empty string if cookie data is undefined
   printFormatted('yellow', 'sessionId:', sessionId)

   //open db connection
   // db_driver.openConnection()
   if (sessionId != '') 
   {
      //authorise user to access application
      // var user = await db_driver.findUserBySessionId(sessionId)
      
      
      //find a user
      var validUser = false//TODO
      var user:User|null = await userRepository.findOneBy({sessionId:sessionId})
      user ? validUser = true : validUser = false
      printFormatted('yellow', 'user:', user)
      printFormatted('yellow', 'validUser:', validUser)
      try 
      {
         // var valid =  await db_driver.authenticateCredentials(user?.username, user?.password)
         //if valid return new auth cookie
         if (validUser) 
         {
            //set new session cookie
            const name = 'memoir-session'
            const newSessionId = uuidv4()//sessionId
            const domain = 'localhost'
            var cookie:Cookie = createSessionCookie(name, newSessionId, domain)
            printFormatted('yellow', 'session cookie:', cookie.getCookieStr())
            res.setHeader('Set-Cookie',cookie.getCookieStr())

            //update session id //IMPORTANT - CHECK FOR ERROR
            user!.sessionId = newSessionId
            userRepository.save(user!)
            //send response
            printFormatted('yellow', 'user:', user)
            res.send({res:true, message:'User credentials were valid. User session ID updated.'})
         }
         else
         {
            res.send({res:false, message:'User credentials were invalid.'})
         }
      } catch (error) 
      {
         printFormatted('red', error)
         res.send({res:false, message:'Problem logging in:'+error})
      }
      finally
      {
         //close db connection
         //db_driver.closeConnection()
      }
   }
   
})


server.post('/save-img', async(req:any,res:any) => {
   //get binary image data from body
   var binaryString = req.body

   //save in the database
   try 
   {
      // db_driver.openConnection()
      //get user session id from header cookies
      var sessionId = getSessionIdFromReq(req)

      //get user from database
      // var user = db_driver.findUserBySessionId(sessionId)
      var user = users.findUserBySessionId(sessionId)



      //IMPORTANT - supposed to fetch images and then add new image to list of images
      //update images
      res.send({res:true, message: 'Successfully saved imaged.'})
   }
   catch (error)
   {
      res.send({res:false, message: 'Problem saving image to database:'+error})
   }
})

server.get('/logout', async (req:any, res:any) => {
   printFormatted('blue', 'response handler "/logout" called')
   try 
   {
      // //open connection
      // db_driver.openConnection()

      //set session cookie to null
      const name = 'memoir-session'
      const domain = 'localhost'
      var cookie:Cookie = createSessionCookie(name, null, domain)
      printFormatted('yellow', 'session cookie:', cookie.getCookieStr())

      //set in header
      res.setHeader('Set-Cookie', cookie.getCookieStr())

      //update session id - set session to null
      const data = { sessionId: null }
      const currentSessionId = getSessionIdFromReq(req)
      // //mongodb update session id to null
      // db_driver.updateUserBySessionId(currentSessionId, data)
      //and return to client wiht res true
      res.send({res:true})
   }
   catch (error)
   {
      printFormattedv2(true,true,'red', 'Problem logging out:', error)
   }
   finally
   {
      // db_driver.closeConnection()
   }
})

server.post('/sign-up', async (req:any, res:any) => {
   // db_driver.openConnection()
   printFormatted('blue', 'response handler "/sign-up" called')
   const name = req.body.name
   const email = req.body.email
   const password1 = req.body.password1
   const password2 = req.body.password2
   const username = req.body.username
   const sessionId = uuidv4()//unique id


   //print request body parameters
   printFormatted('yellow', 
   'name:',name,'\n',
   'email:',email,'\n',
   'password1:', password1,'\n',
   'password2:', password2,'\n',
   'username:', username,'\n',
   'sessionId:', sessionId
   )


   if (password1 != password2) 
   {
      res.send({
         res:false,
         message:'Passwords do not match.'
      })
   }
   try
   {
   // const userExists = await db_driver.authenticateCredentials(username,password1)

   var userExists = authenticateUserCredentials(username, password1)
      if (userExists) 
      {
         res.send({
            res:false,
            message: 'User already exists'
         })
         throw new Error('User Already Exists.')
      }
   
      else
      {
         
         // //create user in db
         // await db_driver.addUser(name,username,password1,email,sessionId)
         users.addUser(new User(name, username, password1, email, sessionId))

         //send response to confirm successful
         res.send({
            res:true,
            message:'user added successfully'
         })
      }
   }
   catch (error)
   {
      printFormatted('red', 'Error adding user to database:', error)
   }
   finally
   {
      // db_driver.closeConnection()
   }

})


