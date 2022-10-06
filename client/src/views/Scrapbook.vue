<script setup lang="ts">
import { onMounted } from 'vue';
import { makeDraggable } from 'simplydrag-js'
import { makeRotatable } from 'simplyrotate-js'



//like window.onload but for vue
onMounted(()=> {

    //object draggable by default
    var draggable = document.querySelector("#toDrag") as HTMLElement;
    makeDraggable(draggable)

    var dragRotateSwitch = document.querySelector('.switch > input') as HTMLInputElement
    dragRotateSwitch.onchange = () => 
    {
        if (dragRotateSwitch.checked == false)
        {
            var draggable = document.querySelector("#toDrag") as HTMLElement;
            makeDraggable(draggable)
        }
        else
        {
            var rotatibleArr = document.querySelectorAll('.rotatible')
            rotatibleArr.forEach((r) => makeRotatable(r as HTMLElement))
        }
    }

    //make menut button clickable

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
        <div class="form-check form-switch switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">Drag or Rotate</label>
        </div>
        <div class="scrapbook-bg">
            <span id="toDrag" class="to-drag rotatible"></span>
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
    .to-drag
    {
        background-image: url(../assets/photos-g9761b2a74_1920.jpg);
        background-size: 100% 100%;
        position: absolute;
        padding: 100px;
        background-color: green;
        width:100px;
        height:40px;
        /* don'd add margin to this or it won't work */
    }

</style>