<script setup lang="ts">
  const props = defineProps({
    heading2:String
  })
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
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Menu
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="/scrapbook">View Scrapbook</a></li>
            <li><a class="dropdown-item" href="/about">About</a></li>
            <li><hr class="dropdown-divider" href="/logout">Logout</li>
          </ul>
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