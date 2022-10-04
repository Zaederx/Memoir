import { config as dotEnvConfig } from 'dotenv'
import { MongoClient } from 'mongodb';
import path from 'path'

//connect to mongo db
const envFilePath = path.join('..', 'demo.env')//only accepts relative path
dotEnvConfig({path: envFilePath})
const password = process.env.DATABASE_PASSWORD
const uri = `mongodb+srv://memoir-cluster:${password}@memoir-cluster.g4ldqzg.mongodb.net/?retryWrites=true&w=majority`;


//Query MongoDB - https://www.mongodb.com/docs/drivers/node/current/quick-start/
//https://www.mongodb.com/docs/drivers/node/current/usage-examples/deleteOne/
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
    if (!user) 
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

    if (!user) 
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
    const result = await col.insertOne(data)
    if(result && result.acknowledged) 
    {
      console.log(`added ${collection} succesfully`)
    }
    else
    {
      throw new Error(`Problem adding ${collection} to database` )
    }
  }
  catch (e)
  {
    console.log(e)
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
async function deleteUser(query:any)
{
  const collection = 'user'
  const col = database.collection(collection)

  try
  {
    const result = await col.deleteOne(query)
    if(result.deletedCount === 1)
    {
      console.log(`successfully deleted 1 user`)
    }
    else 
    {
      throw new Error('No users matched the query')
    }
  }
  catch (e)
  {
    console.log(e)
  }
}

export default client
export { database, addUser, deleteUser, findUserByUsername, findUserBySessionId, addData }