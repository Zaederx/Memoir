<script setup lang="ts">
import { onMounted } from 'vue';
import UploadForm from './UploadForm.vue'
import Banner from './Banner.vue'
import HeadScripts from './HeadScripts.vue'
import { makeDraggable } from 'simplydrag-js'
import { makeRotatable } from 'simplyrotate-js'



// function makeRotatible2(rotatable:HTMLElement)
// {
//     rotatable.onmousedown = (e) => 
//     {
//         e.preventDefault();
//         var startAngle = getMouseAngle(e,rotatable);
//         rotatable.onmousemove = (e) => 
//         {
//             e.preventDefault()
//             var endAngle = getMouseAngle(e,rotatable)
//             var angleOfRotation = (endAngle - startAngle) * -1
//             console.log('angleOfRotation:'+ angleOfRotation)
//             rotate(e,rotatable, angleOfRotation)
//         }
//     }

// }
// function rotate(e:MouseEvent,rotatable:HTMLElement, angle:number)
// {
//     rotatable.style.rotate = angle+'deg'
// }

// function getMouseAngle(e:MouseEvent, rotatable:HTMLElement)
// {
//     var r2D = 180/Math.PI
//     //get element mid points
//     var {midX, midY} = getMidPoints(rotatable)
//     //get mouse click mid points
//     var mouseClickX = e.clientX
//     var mouseClickY = e.clientY
//     //subtract the two to get the length = 
//     var x = mouseClickX + midX
//     var y = mouseClickY + midY
//     //
//     var angle = r2D * Math.atan2(x,y)
//     return angle
// }


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
        <div class="form-check form-switch switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">Drag or Rotate</label>
        </div>
        <div class="scrapbook-bg">
            <span id="toDrag" class="to-drag rotatible"></span>
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
        position: absolute;
        padding: 100px;
        background-color: green;
        width:100px;
        height:40px;
        /* don'd add margin to this or it won't work */
    }
</style>