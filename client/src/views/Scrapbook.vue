<script setup lang="ts">
import { onMounted } from 'vue';
import { makeScrapbookImagesMovable, makeScrapbookImagesResizable } from '@/helpers/scrapbook/scrapbook.js'


onMounted(() => {
    makeScrapbookImagesMovable()
    makeScrapbookImagesResizable()
})


</script>

<template>
<HeadScripts></HeadScripts>
<Banner heading2="Scrapbook"></Banner>
<div class="grid-container">
    <div class="column-1">
        <Suspense>
            <UploadForm></UploadForm>
        </Suspense>
    </div>
    
    <div class="column-2 scrapbook">
        <!-- Switch Drag or Rotate -->
        <div class="form-check form-switch switch">
            <input class="form-check-input" type="checkbox" role="switch" id="switch-drag-rotate">
            <label class="form-check-label" for="flexSwitchCheckDefault">Drag or Rotate</label>
        </div>
        <!-- Switch Fixed or Resizable -->
        <div class="form-check form-switch switch">
            <input class="form-check-input" type="checkbox" role="switch" id="switch-fixed-resizeable">
            <label class="form-check-label" for="flexSwitchCheckDefault">Fixed or Resizeable</label>
        </div>
        <div class="scrapbook-bg" id="scrapbook-bg">
            <span class="to-drag-example draggable rotatible resizeable"></span>
        </div>
    </div>
    <SiteFooter></SiteFooter>
</div>

</template>

<style>
    @import url(../assets/base.css);
    body 
    {
        background-image: url(../assets/photos-g9761b2a74_1920.jpg);
        background-repeat: no-repeat;
        /* fixed - creates cool effect while scrolling */
        background-attachment: fixed;
        background-size: 100% 100%;
        
    }
    .grid-container
    {
        display: grid;
        grid-template-columns: [form] 3fr [scrapbook] 7fr;
        grid-template-rows: [main]10fr [footer]2fr;
        height: 100vh;
    }
    .column-1
    {
        grid-column: form;
    }
    .column-2
    {
        grid-column: scrapbook;
    }
    .switch
    {
        margin-left: 100px;
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
    .draggable
    {
        background-size: 100% 100%;
        position: absolute;
        padding: 100px;
        background-color: green;
        background-image: url();
        width:100px;
        height:40px;
        /* don'd add margin to this or it won't work */
    }
    .to-drag-example
    {
        background-image: url(../assets/photos-g9761b2a74_1920.jpg);
        /* don'd add margin to this or it won't work */
    }

</style>