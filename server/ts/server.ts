import express from 'express'
import { config as dotEnvConfig } from 'dotenv'
import { Cookie, createSessionCookie  } from 'simplycookie-js'
import { v4 as uuidv4 } from 'uuid';
import { authenticateCredentials } from './helpers/login.js'
import crudDriver from './db/db.js'
// import * as url from 'url';
//@ts-ignore
import path from 'path'
const server = express();

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
//allows you to use .env file for additional env variables
const envFilePath = path.join('..', 'demo.env')//only accepts relative path
console.log('\n',`envFilePath:${envFilePath}`)
dotEnvConfig({path: envFilePath })
//@ts-ignore
const PORT = process.env.PORT
const dbPassword = process.env.DATABASE_PASSWORD
const uri = `mongodb+srv://memoir-cluster:${dbPassword}@memoir-cluster.g4ldqzg.mongodb.net/?retryWrites=true&w=majority`;
const db = new crudDriver(uri,'memoir')

server.listen(PORT, () => {
   var message =  '\n'+`Server listening on port:${PORT}`
   console.log(message)
})

//Note res true means that the action of
//the server was succesfully carried out
/*
 * - login
 * - logout
 * - signup
 */
server.post('/login', async (req: any, res: any) => {
   var username = req.body.username
   var password = req.body.password
   var valid =  await authenticateCredentials(username, password)
   //if valid return auth cookie
   if (valid) 
   {
      const name = 'memoir-session'
      const value = uuidv4()//sessionId
      const domain = 'localhost'
      var cookie:Cookie = createSessionCookie(name, value, domain)
      res.headers['Set-Cookie'] = cookie.getCookieStr()
      res.send({res:true})
   }
   else
   {
      res.send({res:false})
   }
})


server.get('/logout', async (req:any, res:any) => {
   //set session cookie to null
   const name = 'memoir-session'
   const domain = 'localhost'
   var cookie:Cookie = createSessionCookie(name, null, domain)
   //set in header
   res.headers['Set-Cookie'] = cookie.getCookieStr()
   //and return to client wiht res true
   res.send({res:true})
})

server.post('/signup', async (req:any, res:any) => {
   const name = req.body.name
   const email = req.body.email
   const password = req.body.paassword
   const username = req.body.username
   const sessionId = uuidv4()//unique id
   const userExists = await authenticateCredentials(username,password)
   if (userExists) 
   {
      res.send({
         res:false,
         message: 'User already exists'
      })
   }
   else
   {
      //create user in db
      await db.addUser(name,username,password,email,sessionId)

      //send response to confirm successful
      res.send({
         res:true,
         message:'user added successfully'
      })
   }
})
