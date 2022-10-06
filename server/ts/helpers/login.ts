//@ts-ignore
import path from 'path'
import { config as dotEnvConfig } from 'dotenv'
import crudDriver from '../db/db.js'
import bcrypt from 'bcryptjs'
import { Cookie, createSessionCookie } from 'simplycookie-js'
import { v4 as uuidv4 } from 'uuid';
//get access to env file variables
const envFilePath = path.join('..', 'demo.env')//only accepts relative path
dotEnvConfig({path: envFilePath})

//get mongodb paassword and uri
//@ts-ignore
const password = process.env.DATABASE_PASSWORD
const uri = `mongodb+srv://memoir-cluster:${password}@memoir-cluster.g4ldqzg.mongodb.net/?retryWrites=true&w=majority`;


//create a new 
var db = new crudDriver(uri,'memoir')



export async function authenticateCredentials(username:string,password:string):Promise<boolean>
{
   try
   {
      var user =  await db.findUserByUsername(username)
      if (!user) throw new Error('No user found')
      //if password match...
      if (await bcrypt.compare(password, user?.password))
      {
         //login
         return true
      }
      else
      {
         return false
      }
   }
   catch(e)
   {
      console.log(e)
   }
   return false
}