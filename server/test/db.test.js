import assert from 'assert';
import * as db from '../js/db/db.js'

describe('Testing db functions', () => {
    //CREATE
    describe('\n\n\nCREATE - addUser(name,username,password,email,sessionId)', ()=> {
        it('should return the persisted the user', async () => {
            //save new user in database
            
            const name = 'test-name'
            const username = 'test-username'
            const password = 'password'
            const email = 'test-email@email.com'
            var testSessionId = 'test-session-id'
            try 
            {
                await db.addUser(name, username, password, email, testSessionId)

                //check that user was persisted in db'
                const userCheck = await db.findUserByUsername(username)
                if (userCheck) {return true}
                else { throw new Error('User was not persisted in database.') }
            }
            catch (e)
            {
                throw e
            }
            finally
            {
                //TODO //IMPORTANT DELETE USER FROM DATABASE
            }
        })
    })

    //READ
    describe('\n\n\nREAD - findUserByUsername(validUsername:string)', ()=> {
        it('should return a user', async () => {
            var username = 'test-username'
            var user = await db.findUserByUsername(username)
            if (user) {return true}
            else { throw new Error('No user returned') }
        })
    })

    describe('\n\n\n READ - findUserByUsername(invalidUsername:string)', ()=> {
        it('should return null', async () => {
            var invalidUsername = 'invlaidUsername'
            var user = await db.findUserByUsername(invalidUsername)
            if (!user) {return true}
            else { throw new Error('User was found when once shouldn\'t be') }
        })
    })

    describe('\n\n\n READ - findUserBySessionId(validSessionId:string)', ()=> {
        it('should return a user', async () => {
            var validSessionId = 'test-session-id'
            var user = await db.findUserBySessionId(validSessionId)
            if (user) {return true}
            else { throw new Error('No user returned') }
        })
    })

    describe('\n\n\nREAD - findUserBySessionId(invalidSessionId:string)', ()=> {
        it('should return null', async () => {
            var invalidSessionId = 'invalid-test-session-id'
            var user = await db.findUserBySessionId(invalidSessionId)
            if (!user) {return true}
            else { throw new Error('User was found when once shouldn\'t be') }
        })
    })

   

    describe(`\n\n\nDELETE - deleteUser(query:any={username:'test-delete-user'})`, () => {
        it('should delete a user', async ()=> {
            
            try
            {
                //add test user to database
                const name = 'test-name'
                const username = 'test-delete-user'
                const password = 'password'
                const email = 'test-email@email.com'
                var testSessionId = 'test-session-id'
                await db.addUser(name, username, password, email, testSessionId)

                //check that user was persisted in db'
                const userCheck = await db.findUserByUsername(username)
                if (!userCheck)
                { throw new Error('User was not persisted in database.') }
               
                //delete test user
                const query = {username: username}
                const result = await db.deleteUser(query)
                if(result && result.deletedCount === 1)
                {
                    return true
                }
                else 
                {
                    throw new Error('Test user was not deleted')
                }
            }
            catch(e)
            {
                throw e
            }

        })
    })
})