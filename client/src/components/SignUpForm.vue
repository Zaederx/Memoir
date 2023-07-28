<script setup lang=ts>
import { fetchCSRFToken } from '@/helpers/headscript/headscript-helper'


async function signUp()
{
    await fetchCSRFToken()
    const username = (document.querySelector('#username') as HTMLInputElement).value
    const email = (document.querySelector('#email') as HTMLInputElement).value
    const name = (document.querySelector('#name') as HTMLInputElement).value
    const p1 = (document.querySelector('#p1') as HTMLInputElement).value
    const p2 = (document.querySelector('#p2') as HTMLInputElement).value

    var csrfMetaTag = document.querySelector('#csrf-token') as HTMLMetaElement
    const csrfToken = csrfMetaTag.content

    const data = { username, email, name, p1, p2 }

    const url = '/api/sign-up'
    var response = await fetch(url, {
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

    alert(await response.text())
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
            <input id="p1" type="password" name="password1" class="form-control"/>

            <label for="password">Re-enter Password</label>
            <input id="p2" type="password" name="password2" class="form-control"/>

            <button id="btn-sign-up" class="btn btn-primary form-control" @click=signUp>Sign Up</button>
            <button id="btn-login" class="btn btn-warning form-control">Login</button>
        </form>
    </div>
</template>