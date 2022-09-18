<script setup lang="ts">
import { onMounted } from 'vue';
type Position = {x:number,y:number}
const initPosition = 
{
    x:-1,
    y:-1
}
const newPosition = 
{
    x:-1,
    y:-1
}

onMounted(()=> {
var draggable = document.querySelector("#toDrag") as HTMLElement;

makeDraggable(draggable)

})
function makeDraggable(draggable:HTMLElement)
{
    console.log('*** make draggable called ***')
    //prep element for draggging
    draggable.style.cursor = "move"
    draggable.style.position = "absolute"
    draggable.setAttribute('draggable','true')
    draggable.innerHTML = " "
    // draggable.addEventListener('dragstart', (e) => 
    // {
    //     console.log('*** drag start called ***')
    //     var dragImage = document.createElement('img')
    //     dragImage.style.height = '1px'
    //     dragImage.style.width = '1px'
    //     dragImage.style.opacity = '0'
    //     //prevent default behaviour
    //     e.preventDefault();
    //     e.dataTransfer?.setDragImage(dragImage,0,0)
    // })
    draggable.ondrag = (e) => drag(e,draggable)
}
function drag(e:DragEvent, draggable:HTMLElement)
{
    console.log('*** drag end called ***')
    console.log(`*** x:${e.clientX}px, y:${e.clientY}px `)
    //get initial coordinates of the element
    draggable.style.left = e.clientX + 'px'
    //set new permanent y
    draggable.style.top = e.clientY + 'px'
}
</script>

<template>
<div>
    <span id="toDrag" class="to-drag">
    </span>
</div>
</template>

<style>
    .to-drag
    {
        padding: 100px;
        background-color: green;
        width:100px;
        height:40px;
    }
</style>