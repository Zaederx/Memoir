import { config as dotEnvConfig } from 'dotenv'
import { Db, MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs'
/**
 * Class to perform Mongodb User CRUD opertations
 * Assumes the collection is called users.
 */
class DbUserCrudDriver {
  
  client:MongoClient
  dbClusterName:string
  database:Db

  constructor(uri:string,dbClusterName:string)
  {
    //connect to mongo db
    this.client = new MongoClient(uri);
    this.dbClusterName = dbClusterName //db name
    //fetch database
    this.database = this.client.db(this.dbClusterName)
  }
  /**
   * Persists / saves usre to mongo db
   * @param name name of the user
   * @param username username of the user
   * @param password password of the user
   * @param email email of the user
   * @param sessionId sessionId of the user
   */
  async addUser(name:string, username:string, password:string, email:string, sessionId?:string) {
    const collection = 'users'
    const data = 
    {
      name:name,
      username:username,
      password:bcrypt.hash(password,8),
      email:email,
      sessionId: sessionId ? sessionId : '',
    }
    await this.addData(collection, data)
  }

  /**
   * Finds a user by their username.
   * Functions returns a user.
   * @param username username of user to be found
   */
  async findUserByUsername(username:string) 
  {
    try
    {
      //find the right collection / column
      const collection = 'users'
      const users = this.database.collection(collection)
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

  async findUserBySessionId(sessionId: string)
  {
    try
    {
      const collection = 'users'
      var users = this.database.collection(collection)
    
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

  /**
   * 
   * @param collection mongo db collection
   * @param data data to be added to the collection
   */
  async addData(collection:string, data:Object)
  {
    //find the right collection / column
    var col = this.database.collection(collection)
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
  async deleteUser(query:any)
  {
    const collection = 'users'
    const col = this.database.collection(collection)

    try
    {
      const result = await col.deleteOne(query)
      if(result.deletedCount === 1)
      {
        console.log(`successfully deleted 1 user`)
        return result
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


  async deleteUserByUsername(username:string)
  {
    var query = {username:username}
    var result = await this.deleteUser(query)
    return result
  }
}

export default DbUserCrudDriver