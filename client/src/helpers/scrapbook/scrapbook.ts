import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { makeDraggable } from 'simplydrag-js'
import { makeRotatable } from 'simplyrotate-js'
import { Printer } from './simplyprint';
/**
 * Makes scrapbook images draggable or rotatible dependent on switch mode
 * Noe you can only dray or rotate while images is not resizeable
 */
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
            draggableArr.forEach((draggable) => makeDraggable(draggable as HTMLElement))
        }
        //make images rotatible
        else
        {
            var rotatibleArr = document.querySelectorAll('.rotatible')
            rotatibleArr.forEach((r) => makeRotatable(r as HTMLElement))
        }
    }
}

/**
 * Makes scrapbook images resizable depending on switch mode
 */
export function makeScrapbookImagesResizable()
{
 
    //get the resizeSwitch
    var resizeSwitch = document.querySelector('#switch-fixed-resizeable') as HTMLInputElement

    resizeSwitch.onchange = () => 
    {
        var resizeableArr = document.querySelectorAll('.resizeable')
        //if checked - make images resizable
        if(resizeSwitch.checked == true)
        {
            resizeableArr.forEach((r) => makeResizable(r as HTMLElement))
        }
        //else make images not resizable
        else
        {
            resizeableArr.forEach((r) => makeNotResizable(r as HTMLElement))
        }
        
    }
    
}

/**
 * makes an individual element resizeable
 * @param element to resize
 */
function makeResizable(element: HTMLElement)
{
    element.onmousemove = null
    element.onmousedown = null
    element.style.resize = 'both'
    element.style.overflow = 'auto'
}

/**
 * Makes element not resizeable
 * @param element element to make not resizeable
 */
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

/**
 * Checks whether and element is part of the scrapbook.
 * the scrapbook border, white background and images
 * @param element element to be validated
 */
function ignoreNonScrapbookElements(element: HTMLElement):boolean
{
    console.log(`element id:${element.id}, tagname:${element.tagName}`)

    var scrapbook = document.querySelector('#scrapbook')
    var scrapbookbg = document.querySelector('#scrapbook-bg')
    // var valid = (element == document.head || element == document.body || element == scrapbook || element == scrapbookbg || (element.tagName == 'IMG' && scrapbookbg?.contains(element)))

    var valid = !(element.id == 'navbar' || element.className == 'column-1' || element.id == 'footer' || element.classList.contains('to-drag-example') || element.classList.contains('switch'))
    const ignore = true
    const include = false
    console.log(`valid:${valid}`)
    if(valid) { return include}
    else { return ignore }
}
// export async function printScrapbook2() 
// {
//     //get the scrapbook
//     const scrapbook = document.querySelector('#scrapbook') as HTMLDivElement
//     const head = document.head.innerHTML
//     const body = document.body.innerHTML
//     var pdf = new jsPDF('p','pt','a4')

//     pdf.html(head+body,{})
//     pdf.save('scrapbook.pdf')
// }


export async function printScrapbook()
{
    var printer = new Printer('#scrapbook-bg');
    printer.print()
}