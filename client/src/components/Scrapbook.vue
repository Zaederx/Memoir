<script setup lang="ts">
import { onMounted } from 'vue';
import { makeDraggable } from 'simplydrag-js'
import UploadForm from './UploadForm.vue'
import Banner from './Banner.vue'
import HeadScripts from './HeadScripts.vue'




// function makeClickable(rotatable:HTMLElement)
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
// var draggable = document.querySelector("#toDrag") as HTMLElement;
// makeDraggable(draggable)
//study -> https://jsfiddle.net/o5jjosvu/65/ - rotate with jQuery
var rotatibleArr = document.querySelectorAll('.rotatible')
    rotatibleArr.forEach((r) => makeRotatable(r as HTMLElement))

})
type Position = {x:number,y:number}
var clickPosition = {x:-1, y:-1}
var elementPosition = {x:-1, y:-1}//top-left corner
var elementCenter = {x:-1, y:-1}//center of element
var mouseDragPosition = {x:-1, y:-1}
function getMidPoints(rotatable:HTMLElement)
{
     // //get position of element within containing element
     var rect = rotatable.getBoundingClientRect()
    elementPosition.x = rect.x
    elementPosition.y = rect.y

    //radius
    var radius = rect.width/2

    //midX and mixY
    var midX = rect.x+rect.width/2
    var midY = rect.y+rect.height/2
    return {midX,midY,radius}
}
function makeRotatable(rotatable:HTMLElement)
{

 
    //on mouse down call rotate function
    rotatable.onmousedown = (e) => {
        //get mouse click position within the element
        var {midX, midY} = getMidPoints(rotatable)

        //get degress of click position
        //radian
        var radians = Math.atan2(midX - clickPosition.x, midY - clickPosition.y)
        //degrees
        var degreesOfInitialClick = Math.round((radians *(180/Math.PI)))
        
        
        

        //https://jsfiddle.net/o5jjosvu/65/
        //https://codepen.io/hienlm/pen/BaojoBj
        rotatable.onmousemove = (e) => rotateByDegree(e,rotatable,degreesOfInitialClick)
    }
    rotatable.onmouseup = (e) => endRotate(e,rotatable)
}
/**
 * 
 * @param e 
 * @param rotatable HTML element to rotate
 * @param angle angle in degrees
 */
function rotateByDegree(e:MouseEvent, rotatable:HTMLElement, initialClickAngle:number)
{
    var {midX, midY} = getMidPoints(rotatable)
    //get degress of click position
    //radian
    var radians = Math.atan2(midX - e.clientX , midY - e.clientY)
    //degrees
    var degreesOfMouseMove = Math.round((radians *(180/Math.PI))) *-1
    var angle = degreesOfMouseMove - initialClickAngle
    console.log(`angle:${angle}`)
    rotatable.style.rotate = angle+'deg'
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
        var adjacent = x
        angle = Math.atan(oppposite/adjacent)
        
    }
    // if +x and +y
    else if(positiveX && positiveY)
    {
        //rotate by x position along q2 - 90 to 180 degrees
        var oppposite = x
        var adjacent = y 
        angle = Math.atan(oppposite/adjacent)+90
    }
    //if +x and -y
    else if (positiveX && !positiveY)
    {
        var oppposite = x
        var adjacent = y
        angle = Math.atan(oppposite/adjacent)+180
    }

    //if -x and -y
    else if (!positiveX && !positiveY)
    {
        var oppposite = x
        var adjacent = y
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
        margin:100px;
    }
</style>