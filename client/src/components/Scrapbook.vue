<script setup lang="ts">
import { onMounted } from 'vue';
import { makeDraggable } from 'simplydrag-js'
import UploadForm from './UploadForm.vue'
import Banner from './Banner.vue'
import HeadScripts from './HeadScripts.vue'

//like window.onload but for vue
onMounted(()=> {
// var draggable = document.querySelector("#toDrag") as HTMLElement;
// makeDraggable(draggable)


var rotatibleArr = document.querySelectorAll('.rotatible')
    rotatibleArr.forEach((r) => makeRotatable(r as HTMLElement))

})
type Position = {x:number,y:number}
var clickPosition = {x:-1, y:-1}
var elementPosition = {x:-1, y:-1}
var mouseDragPosition = {x:-1, y:-1}
function makeRotatable(rotatable:HTMLElement)
{

    //on mouse down call rotate function
    rotatable.onmousedown = (e) => {
        //get mouse click position within the element
        clickPosition.x = e.clientX
        clickPosition.y = e.clientY
        // //get position of element within containing element
        var rect = rotatable.getBoundingClientRect()
        elementPosition.x = rect.x
        elementPosition.y = rect.y

        // var midX = rect.left + rect.right
        // var midY = rect.top + rect.bottom
        rotatable.onmousemove = (e) => rotateByMouseDrag(e,rotatable)
    }
    rotatable.onmouseup = (e) => endRotate(e,rotatable)
}
function rotateByMouseDrag(e:MouseEvent, element:HTMLElement)
{
    // mouseDragPosition.x = e.clientX
    // mouseDragPosition.y = e.clientY

    var x = e.clientX - elementPosition.x
    var y = e.clientY - elementPosition.y

    var positiveX = x >= 0
    var positiveY = y >= 0
    //turning point depends on whether x and y are positive or negative
    //if -x and +y
    var angle = 0
    if(!positiveX && positiveY)
    {
        var oppposite = y
        var adjacent = x * -1
        angle = Math.atan(oppposite/adjacent)
        
    }
    // if +x and +y
    if(positiveX && positiveY)
    {
        //rotate by x position along q2 - 90 to 180 degrees
        var oppposite = x
        var adjacent = y 
        angle = Math.atan(oppposite/adjacent)+90
    }
    //if +x and -y
    if (positiveX && !positiveY)
    {
        var oppposite = x
        var adjacent = y * -1
        angle = Math.atan(oppposite/adjacent)+180
    }

    //if -x and -y
    if (!positiveX && !positiveY)
    {
        var oppposite = x * -1
        var adjacent = y * -1
        angle = Math.atan(oppposite/adjacent)+270
    }
    console.log(`angle:${angle}`)
    element.style.rotate = angle+'deg'
}

function endRotate(e:MouseEvent,rotatable:HTMLElement)
{
    rotatable.onmousemove = null
}

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