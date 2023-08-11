<script setup lang="ts" defer>
// import { loginViaSessionCookie, loginViaEmailPassword } from '@/helpers/login-form/login-helper';
// import { useAuthenticationStore } from '@/stores/isAuthenticated';
import { fetchCSRFToken } from '@/helpers/headscript/headscript-helper'
import { useRouter, type Router } from 'vue-router'
import { findCookie, findCookieAttribute } from 'simplycookie-js'
import { checkForSessionCookie, loginViaSessionCookie } from '@/helpers/login-form/login-helper'
import { useAuthenticationStore } from '@/stores/isAuthenticated'
import { printFormattedv2 } from 'printformatted-js'


const urlSessionCookie = '/api/login-session-cookie'
var router:Router = useRouter()
var authStore = useAuthenticationStore()
fetchCSRFToken().then(()=> {
    loginViaSessionCookie(urlSessionCookie,router,authStore)
})



var urlLogin = '/api/login'
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const logoutSuccessful = urlParams.get('logout')

//alert if logout is successful
if (logoutSuccessful)
{
    alert("Logout was successful")
}
async function login()
{
    var username = (document.querySelector('#username') as HTMLInputElement).value
    var password = (document.querySelector('#password') as HTMLInputElement).value
    
    var csrfMetaTag = document.querySelector('#csrf-token') as HTMLMetaElement
    const csrfToken = csrfMetaTag.content

    var data = { username, password }
    
    const resData = fetch(urlLogin,{
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#sending_a_request_with_credentials_included
        headers: {
        "CSRF-TOKEN":csrfToken,
        "Content-Type":"application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',

        },
        redirect: "follow", //manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })

    //display response text
    //@ts-ignore
    var response = await resData
    var resJson = await response.json();
    if (resJson.res == true)
    {
        alert('Login successful:'+resJson.message)
        router.push('/scrapbook')
    }
    else 
    {
        alert('Login unsuccessful:'+resJson.message)
        var form = document.querySelector('#login-form') as HTMLFormElement
        //clear all form values
        form.reset()
    }
}
    
</script>




<template>

    <div id="form-container" class="container form-control form-size">
        <form id="login-form" class="form" action="#">
            <label for="username">Username</label>
            <input id="username" type="username" name="username" class="form-control"/>
            
            <label for="password">Password</label>
            <input id="password" type="password" name="password" class="form-control"/>
        </form>
        <!-- <button id="btn-login" class="btn btn-primary form-control" @click="loginViaEmailPassword(url,$router)">Login</button> -->
        <br>
        <br>
        <button id="btn-login" class="btn btn-primary form-control" @click="login">Login</button>
        <a href="/sign-up">
            <button id="btn-sign-up" class="btn btn-warning form-control">Sign Up</button>
        </a>
        
    </div>
</template>

<style scoped>
.form-size
{
    margin-top: 100px;
    height: 300px;
}
</style>