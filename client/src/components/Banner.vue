<script setup lang="ts">
import { fetchCSRFToken } from '@/helpers/headscript/headscript-helper';
import router from '@/router';
import { printFormattedv2 } from 'printformatted-js';
import { useAuthenticationStore } from '@/stores/isAuthenticated';
  const props = defineProps({
    heading2:String
  })

  var authStore = useAuthenticationStore()
  async function logout()
  {
    printFormattedv2(false, false, 'blue', 'function logout called')
    await fetchCSRFToken()
    var csrfMetaTag = document.querySelector('#csrf-token') as HTMLMetaElement
    const csrfToken = csrfMetaTag.content
    const url = '/api/logout'
    var response = fetch(url,{
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#sending_a_request_with_credentials_included
        headers: {
        "CSRF-TOKEN":csrfToken,
        "Content-Type":"application/json"
        },
        redirect: "follow", //manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
        
    })

    //NOTE: Use router instead of window.location.href because the router creates a navigation history
    var res = await response
    if(res.ok)
    {
      //set isAuthenticated to false
      authStore.unauthenticate()
      //alert message & redirect to home
      alert('Logout was successful')
      router.push('/')//home
    }
    else 
    {
      alert('Logout was unsuccessful')
    }
  }
</script>

<template>
<nav id="navbar" class="navbar navbar-expand-lg navbar-dark" style="background-color:var(--orange)">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Memoir</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/scrapbook">Scrapbook</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">About</a>
        </li>
        <li class="nav-item">
          <a Logout class="nav-link" @click=logout>Logout</a>
        </li>
        
      </ul>
      <div class="nav-center">
        <a>{{heading2}}</a>
      </div>
      <div class="nav-right">

      </div>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
</template>

<style scoped>
  @import url(../assets/base.css);
</style>