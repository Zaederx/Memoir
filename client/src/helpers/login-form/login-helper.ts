import $ from 'jquery'
import { messageToHTML } from '@/helpers/message-to-html.js';
import type { Router } from 'vue-router'
import type { Store } from 'pinia'


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
    var email = $("#email").val() as string
    var password = $("#password").val() as string
    var data = {email:email, password:password}
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

    console.log('loginViaSessionCookie called')
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
    //set authentication value in the sessionStorage
    var responseObj = {isAuthenticated:response.ok}
    sessionStorage.setItem('auth', JSON.stringify(responseObj))
    authStore.checkAuth()//authenticate or unauthenticate based on response
    if(response.ok == authenticated)
    {
        //rediect user to user home page
        if (router.currentRoute.value.name == 'login')
        {
            router.push('/user-home')
        }
    }
    else {
        const message = 'Login was unsuccessful'
        const html = messageToHTML(message)
        $('#errors').html(html)
    }
    
}
