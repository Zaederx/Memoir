import $ from 'jquery'
import { messageToHTML } from '@/helpers/message-to-html.js';
import type { Router } from 'vue-router'
import type { Store } from 'pinia'
import { findCookie, findCookieAttribute } from 'simplycookie-js';
import { printFormattedv2 } from 'printformatted-js';

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

    //set authentication value in the sessionStorage
    sessionStorage.setItem('auth', JSON.stringify({isAuthenticated:response.ok}))
    authStore.checkAuth()//authenticate or unauthenticate based on response
    //send user back to home page on successful authentication
    if (response.ok) 
    {
        router.push('/user-home')
    }
    else 
    {
        const message = 'Login was unsuccessful'
        const html = messageToHTML(message)
        $('#errors').html(html)
        authStore.checkAuth()
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
    
    token.csrfToken = $("meta[name='csrf-token']").attr("content") as string;
    if(token.csrfToken == null || token.csrfToken == undefined) {

    }
    //note to self - memoir session cookie is HTTPonly - not accessible from javascript - won't show up in document.cookie - but will be automatically sent in response
    var data = {}
    // var cookie = getAppCookie(cookieName,cookieValue)

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
    //set authentication value in the sessionStorage
    var responseObj = {isAuthenticated:response.ok}
    sessionStorage.setItem('auth', JSON.stringify(responseObj))

    if(response.ok == authenticated)
    {
        alert('Login was successful')
        //rediect user to user home page
        if (router.currentRoute.value.name == 'Login')
        {
            router.push('/scrapbook')
        }
        authStore.set
    }
    else {
        const message = 'Login was unsuccessful'
        alert(message)
    }
    
}


/**
 * check whether there is already a session cookie
 */
export function checkForSessionCookie()
{
    const asArray = false
    printFormattedv2(false, false, 'yellow', 'all js accessible cookies', document.cookie)
    var cookieStr:string = findCookie(document.cookie, 'memoir-session', asArray) as string
    // var [sessionId, cookie] = findCookieAttribute(cookieStr, 'memoir-session')
    if (cookieStr) {return true}
    else {return false}
}
