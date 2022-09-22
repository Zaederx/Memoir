<script setup lang="ts">
import { onMounted } from 'vue';
import { makeDraggable } from 'simplydrag-js'
import UploadForm from './UploadForm.vue'
import Banner from './Banner.vue'
import HeadScripts from './HeadScripts.vue'

//like window.onload but for vue
onMounted(()=> {
var draggable = document.querySelector("#toDrag") as HTMLElement;
makeDraggable(draggable)

})


</script>

<template>
<HeadScripts></HeadScripts>
<Banner></Banner>
<div class="grid-container">
    <div class="column-1">
        <Suspense>
            <UploadForm></UploadForm>
        </Suspense>
    </div>
    <div class="column-2 scrapbook">
        <div class="scrapbook-bg">
            <span id="toDrag" class="to-drag"></span>
        </div>
    </div>
</div>
</template>

<style>
    @import url(../assets/base.css);
    .grid-container
    {
        display: grid;
        grid-template-columns: [form] 3fr [scrapbook] 7fr;
        grid-template-rows: 1fr;
        height: 100vh;
    }
    .column-1
    {
        grid-column: form;
    }
    .column-2
    {
        grid-column: scrapbook;
        display:grid;
    }
    .scrapbook
    {
        /* width: 500px; */
        border-style:dotted;
        background-color: var(--cool-grey);
    }
    .scrapbook-bg
    {
        border-radius: 50px;
        height: 90%;
        width: 90%;
        margin: auto;
        background-color:var(--light-grey);
        z-index: 0;
    }
    .to-drag
    {
        position: absolute;
        padding: 100px;
        background-color: green;
        width:100px;
        height:40px;
    }
</style>