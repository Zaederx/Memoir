import express from 'express'
import { config as dotEnvConfig } from 'dotenv'
import { Cookie, createSessionCookie  } from 'simplycookie-js'
import { v4 as uuidv4 } from 'uuid';

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
const PORT = process.env.PORT


server.listen(PORT, () => {
   var message =  '\n'+`Server listening on port:${PORT}`
   console.log(message)
})

/*
 * - login
 * - logout
 * - signup
 */
server.post('/login', (req: any, res: any) => {
   var username = req.body.username
   var password = req.body.password
   var valid = checkCredentails(username, password)
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


function checkCredentails(username:string, password:string):boolean
{

}
