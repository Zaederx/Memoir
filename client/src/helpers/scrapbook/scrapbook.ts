import { makeDraggable } from 'simplydrag-js'
import { makeRotatable } from 'simplyrotate-js'


export function makeScrapbookImagesMovable()
{
    //object draggable by default
    var draggableArr = document.querySelectorAll(".draggable") ;
    draggableArr.forEach((draggable)=> makeDraggable(draggable as HTMLElement))
    //drag rotate switch
    var dragRotateSwitch = document.querySelector('#switch-drag-rotate') as HTMLInputElement
    //on change...
    dragRotateSwitch.onchange = () => 
    {
        //if switch is checked - make images draggable
        if (dragRotateSwitch.checked == false)
        {
            var draggableArr = document.querySelectorAll(".draggable") ;
            draggableArr.forEach((draggable)=>makeDraggable(draggable as HTMLElement))
        }
        //make images rotatible
        else
        {
            var rotatibleArr = document.querySelectorAll('.rotatible')
            rotatibleArr.forEach((r) => makeRotatable(r as HTMLElement))
        }
    }
}

export function makeScrapbookImagesResizable()
{
 
    //get the resizeSwitch
    var resizeSwitch = document.querySelector('#switch-fixed-resizeable') as HTMLInputElement

    resizeSwitch.onchange = () => 
    {
        //if checked - make images resizable
        if(resizeSwitch.checked == true)
        {
            var resizeableArr = document.querySelectorAll('.resizeable')
            resizeableArr.forEach((r) => makeResizable(r as HTMLElement))
        }
        //else make images not resizable
        else
        {
            var resizeableArr = document.querySelectorAll('.resizeable')
            resizeableArr.forEach((r) => makeNotResizable(r as HTMLElement))
        }
        
    }
    
}

function makeResizable(element: HTMLElement)
{
    element.onmousemove = null
    element.onmousedown = null
    element.style.resize = 'both'
    element.style.overflow = 'auto'
}

function makeNotResizable(element: HTMLElement) 
{
    var dragRotateSwitch = document.querySelector('#switch-drag-rotate') as HTMLInputElement
    element.style.resize = 'none'
    element.style.overflow = 'visible'//default setting
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