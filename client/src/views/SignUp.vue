<!-- JS & VUE -->
<script setup lang="ts">

</script>

<!-- HTML -->
<template>
   <HeadScripts></HeadScripts>
   <Banner heading1="Chat" heading2="SignUp View"></Banner>
   <HomeMain>
      <!-- needed because the singup fomr has a function returning a promise at top level -->
      <Suspense> 
         <SignUpForm></SignUpForm>
      </Suspense>
   </HomeMain>
   <SiteFooter></SiteFooter>
</template>

<!-- CSS -->
<style scoped>
@import url('@/assets/base.css')
</style>