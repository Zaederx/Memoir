<script setup lang=ts>
import { fetchCSRFToken } from '@/helpers/headscript/headscript-helper'
import { printFormatted } from 'printformatted-js'
fetchCSRFToken()

async function signUp(e:Event)
{
    e.preventDefault()// to stop the form from being submitted
    const username = (document.querySelector('#username') as HTMLInputElement).value
    const email = (document.querySelector('#email') as HTMLInputElement).value
    const name = (document.querySelector('#name') as HTMLInputElement).value
    const password1 = (document.querySelector('#password1') as HTMLInputElement).value
    const password2 = (document.querySelector('#password2') as HTMLInputElement).value

    var csrfMetaTag = document.querySelector('#csrf-token') as HTMLMetaElement
    const csrfToken = csrfMetaTag.content

    const data = { username, email, name, password1, password2 }

    const url = '/api/sign-up'
    fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#sending_a_request_with_credentials_included
        headers: {
        "CSRF-TOKEN":csrfToken,
        "Content-Type":"application/json"
        },
        redirect: "follow", //manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        
    })
    .then(async (response:Response) => 
    {
        //print alert message to screen
        alert((await response.json()).message)
        //change page
        window.location.href = '/scrapbook'
    })
    .catch((error)=> { printFormatted('red', error) })

    
}
</script>
<template>
    <div id="form-container" class="container form-control center">
        <form id="sign-up-form" class="form">
            <label for="username">Username</label>
            <input id="username" type="username" name="username" class="form-control"/>
            <label for="email">Email</label>
            <input id="email" type="email" name="email" class="form-control"/>
            <label for="name">Name</label>
            <input id="name" type="text" name="name" class="form-control"/>
            <label for="password">Password</label>
            <input id="password1" type="password" name="password1" class="form-control"/>

            <label for="password">Re-enter Password</label>
            <input id="password2" type="password" name="password2" class="form-control"/>

            <button id="btn-sign-up" class="btn btn-primary form-control" @click=signUp>Sign Up</button>
            <button id="btn-login" class="btn btn-warning form-control">Login</button>
        </form>
    </div>
</template>