import assert from 'assert';
import * as db from '../js/db/db.js'

describe('Testing db functions', () => {
    describe('findUserByUsername(validUsername:string)', ()=> {
        it('should return a user', async () => {
            var username = 'username1'
            var user = await db.findUserByUsername(username)
            if (user) {return true}
            else { throw new Error('No user returned') }
        })
    })

    describe('findUserByUsername(invalidUsername:string)', ()=> {
        it('should return null', async () => {
            var invalidUsername = 'invlaidUsername'
            var user = await db.findUserByUsername(invalidUsername)
            if (!user) {return true}
            else { throw new Error('User was found when once shouldn\'t be') }
        })
    })

    describe('findUserBySessionId(validSessionId:string)', ()=> {
        it('should return a user', async () => {
            var validSessionId = 'test-session-id'
            var user = await db.findUserBySessionId(validSessionId)
            if (user) {return true}
            else { throw new Error('No user returned') }
        })
    })

    describe('findUserBySessionId(invalidSessionId:string)', ()=> {
        it('should return null', async () => {
            var invalidSessionId = 'invalid-test-session-id'
            var user = await db.findUserBySessionId(invalidSessionId)
            if (!user) {return true}
            else { throw new Error('User was found when once shouldn\'t be') }
        })
    })




    //TODO //IMPORTANT TO COMPLETE
    describe('addUser(name,username,password,email,sessionId)', ()=> {
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


    describe('don\'t addUser(name,username,password,email,sessionId)', ()=> {
        it('should not return a user', async () => {
            //save new user in database
            try 
            {
                const username = 'invalid-test-username'
                // await db.addUser(name, username, password, email, testSessionId)

                //check that user was persisted in db'
                const userCheck = await db.findUserByUsername(username)
                if (!userCheck) {return true}
                else { throw new Error('User should not exist in database') }
            }
            catch (e)
            {
                throw e
            }
        })
    })


})