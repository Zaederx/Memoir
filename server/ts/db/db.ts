import { config as dotEnvConfig } from 'dotenv'
import { MongoClient } from 'mongodb';
import path from 'path'

//connect to mongo db
const envFilePath = path.join('..', 'demo.env')//only accepts relative path
dotEnvConfig({path: envFilePath})
const password = process.env.DATABASE_PASSWORD
const uri = `mongodb+srv://memoir-cluster:${password}@memoir-cluster.g4ldqzg.mongodb.net/?retryWrites=true&w=majority`;


//Query MongoDB - https://www.mongodb.com/docs/drivers/node/current/quick-start/
const client = new MongoClient(uri);
const dbClusterName = 'memoir' //db name
//fetch databse
var database = client.db(dbClusterName)
async function addUser(name:string, username:string, password:string, email:string, sessionId?:string) {
  const collection = 'users'
  const data = 
  {
    name:name,
    username:username,
    password:password,
    email:email,
    sessionId: sessionId ? sessionId : '',
  }
  await addData(collection, data)
}

/**
 * Finds a user by their username.
 * Functions returns a user.
 * @param username username of user to be found
 */
async function findUserByUsername(username:string) 
{
  try
  {
    //find the right collection / column
    const collection = 'users'
    const users = database.collection(collection)
    //get user by username
    var query = {username:username}
    const user = await users.findOne(query)
    if (user) 
    {
      console.log(user)
    }
    else
    {
      throw new Error('User not found')
    }
    return user
  }
  catch (e)
  {
    console.log(e)
  }
 
}

async function findUserBySessionId(sessionId: string)
{
  try
  {
    const collection = 'users'
    var users = database.collection(collection)
  
    const query = {sessionId: sessionId}
    const user  = await users.findOne(query)

    if (user) 
    {
      console.log(user)
    }
    else
    {
      throw new Error('User not found')
    }
    return user
  }
  catch (e)
  {
    console.log(e)
  }
  
}

async function addData(collection:string, data:Object)
{
  //find the right collection / column
  var col = database.collection(collection)
  //insert new data
  try 
  {
    const result = col.insertOne(data)
    console.log(result)
  }
  catch (e)
  {
    console.log(e)
  }
  
}


async function deleteUser()
{
  throw new Error('NOT YET IMPLEMENTED')
}

export default client
export { database, addUser, findUserByUsername, findUserBySessionId, addData }