import $ from 'jquery'
import { messageToHTML } from '../../helpers/message-to-html.js';
import type { Router } from 'vue-router'
import type { Store } from 'pinia'
import { findCookie, findCookieAttribute } from 'simplycookie-js';
import { printFormattedv2 } from 'printformatted-js';
import { Response } from '../response.js'

/**
 * NOTES:
 * Thre reason I'm using Pinia stores, is because there is 
 */

/**
 * Attempts to log the user in via email and password.
 * Client recieves session cookie upon successful authentication
 * @param url the url of the request to be made 
 * @param router the vue router to be used
 */
export async function loginViaEmailPassword(url:string='/api/login', router:Router, authStore:Store<'isAuthenticated',any>)
{
    var token = {csrfToken:''}
    
    token.csrfToken = $("meta[name='csrf-token']").attr("content") as string;
    if(token.csrfToken == null || token.csrfToken == undefined) {

    }
    console.log(`Login Form setup script - csrfToken: ${token.csrfToken}`);
    console.log('Attempting to login')
    console.log(`document.cookie: ${document.cookie}`)
    console.log(`token.csrfToken: ${token.csrfToken}`)
    var username = $("#username").val() as string
    var password = $("#password").val() as string
    var data = {username:username, password:password}
    // var cookie = getAppCookie(cookieName,cookieValue)

    const response = await fetch(url,{
        method: 'POST',
        mode:'cors',
        credentials:'include',
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'http://localhost:3000',
            'CSRF-Token':token.csrfToken
        },
        redirect: 'error',
        body: JSON.stringify(data),
    })

    const authenticated = true
    var responseJSON = await response.json()
    var responseObj:Response = JSON.parse(responseJSON)
    //set authentication value in the sessionStorage [storage in the browser - https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage]
    sessionStorage.setItem('auth', JSON.stringify(responseObj.res))

    //send user back to home page on successful authentication
    if (response.ok && responseObj.res == authenticated) 
    {
        authStore.authenticate()//set authenticationg to true in pinia store
        router.push('/user-home')
    }
    else 
    {
        const message = 'Login was unsuccessful'
        const html = messageToHTML(message)
        $('#errors').html(html)
        console.log('Log in unsuccessful')
    }
}

/**
 * Attempts to log user in via session cookie on the client broswer.
 * If valid session cookie is present and is sent along with a csrfToken
 * and _csrf cookie for CSRF protection, then the user is logged in
 * on the server side and given an update session cookie with a new id
 * 
 * NOTE: The Access-Control-Allow-Credentials response header tells browsers whether
 *  to expose the response to the frontend JavaScript code
 *  see [link](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials#examples)
 */
export async function loginViaSessionCookie(url:string='/api/login-session-cookie', router:Router, authStore:Store<'isAuthenticated',any>)
{
    printFormattedv2(false,true,'yellow','loginViaSessionCookie called')
    var token = {csrfToken:''}
    
    //gets the csrf token from the html
    token.csrfToken = $("meta[name='csrf-token']").attr("content") as string;
    if(token.csrfToken == null || token.csrfToken == undefined) {

    }
    //note to self - memoir session cookie is HTTPonly - not accessible from javascript - won't show up in document.cookie - but will be automatically sent in response
    var data = {}
    // var cookie = getAppCookie(cookieName,cookieValue)

    //send a post message to trigger the 'login-session-cookie' api handler
    //effectively sends a message to start trying to log you in via your session cookie (if you have one)
    const response = await fetch(url,{
        method: 'POST',
        mode:'cors',
        // credentials:'include',
        headers: {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'http://localhost:3000',
            'CSRF-Token':token.csrfToken
        },
        redirect: 'error',
        // body: JSON.stringify(data),
    })

    const authenticated = true
    //set authentication value in the vue-pinia sessionStorage
    console.log('response body:'+response.json())
    
    //get response object out of json
    var responseJSON = await response.json()
    var responseObj = JSON.parse(responseJSON)
    // var responseObj = {isAuthenticated:response}
    //set authentication value in the sessionStorage [storage in the browser - https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage]
    sessionStorage.setItem('auth', JSON.stringify(responseObj.res))

    //just because the response was successful ('response.ok == true') doesn't mean the user is authenticated
    //need to check the json 'res' variable and 'message'
    if(response.ok && responseObj.res == authenticated)
    {
        alert('Login was successful')
        //rediect user to user home page
        if (router.currentRoute.value.name == 'Login')
        {
            router.push('/scrapbook')
        }
        authStore.authenticate()//set user to authenticated
    }
    else {
        const message = 'Login was unsuccessful'
        alert(message)
    }
    
}


/**
 * check whether there is already a session cookie
 */
// export function checkForSessionCookie()
// {
//     const asArray = false
//     const NODE = false
//     const TRACE = false
//     printFormattedv2(NODE, TRACE, 'yellow', 'all js accessible cookies', document.cookie)
//     var cookieStr:string = findCookie(document.cookie, 'memoir-session', asArray) as string
//     // var [sessionId, cookie] = findCookieAttribute(cookieStr, 'memoir-session')
//     if (cookieStr) {return true}
//     else {return false}
// }
