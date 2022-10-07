import { makeDraggable } from 'simplydrag-js'
import { makeRotatable } from 'simplyrotate-js'


export function makeScrapbookImagesMovable()
{
    //object draggable by default
    var draggableArr = document.querySelectorAll(".draggable") ;
    draggableArr.forEach((draggable)=>makeDraggable(draggable as HTMLElement))

    var dragRotateSwitch = document.querySelector('.switch > input') as HTMLInputElement
    dragRotateSwitch.onchange = () => 
    {
        if (dragRotateSwitch.checked == false)
        {
            var draggableArr = document.querySelectorAll(".draggable") ;
            draggableArr.forEach((draggable)=>makeDraggable(draggable as HTMLElement))
        }
        else
        {
            var rotatibleArr = document.querySelectorAll('.rotatible')
            rotatibleArr.forEach((r) => makeRotatable(r as HTMLElement))
        }
    }
}