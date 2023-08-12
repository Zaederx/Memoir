import { makeDraggable, type options } from 'simplydrag-js'
import { makeRotatable } from 'simplyrotate-js'
import { Printer } from 'simplyprint-js';
/**
 * Makes scrapbook images draggable or rotatable dependent on switch mode
 * Now you can only drag or rotate while images are not resizeable
 */
export function makeScrapbookElementsMovable()
{
    var scrapbook = document.querySelector('#scrapbook') as HTMLElement
    const options = {dataAttributeName:'scrapbook', parentElement:scrapbook} as options
    //object draggable by default
    var draggableArr = document.querySelectorAll(".draggable") ;
    draggableArr.forEach((draggable)=> makeDraggable(draggable as HTMLElement, options))
    //drag rotate switch
    var dragRotateSwitch = document.querySelector('#switch-drag-rotate') as HTMLInputElement
    //on change...
    dragRotateSwitch.onchange = () => 
    {
        //if switch is checked - make images draggable
        if (dragRotateSwitch.checked == false)
        {
            var draggableArr = document.querySelectorAll(".draggable");
            
            draggableArr.forEach((draggable) => makeDraggable(draggable as HTMLElement, options))
        }
        //make images rotatable
        else
        {
            var rotatableArr = document.querySelectorAll('.rotatable')
            rotatableArr.forEach((r) => makeRotatable(r as HTMLElement))
        }
    }
}

/**
 * Makes scrapbook images resizable depending on switch mode
 */
export function makeScrapbookElementsResizable()
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

    //check if drag rotate switch is false
    //determines whether to make item draggable or rotatable after turning off resizing
    if (dragRotateSwitch.checked == false)
    {
        var scrapbook = document.querySelector('#scrapbook')
        const options = {dataAttributeName:'scrapbook', parentElement:scrapbook} as options
        var draggableArr = document.querySelectorAll(".draggable") ;
        draggableArr.forEach((draggable)=> makeDraggable(draggable as HTMLElement, options))
    }
    else
    {
        var rotatableArr = document.querySelectorAll('.rotatable')
        rotatableArr.forEach((r) => makeRotatable(r as HTMLElement))
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


/**
 * Set each text box element to content editable
 * (i.e. each <p> tag marked text )
 */
export function editText()
{
    var editSwitch = document.querySelector('#switch-editable-text') as HTMLInputElement
    editSwitch.onchange = () => 
    {
        const textBoxes = document.querySelectorAll('.text')
        if (editSwitch.checked)
        {
            textBoxes.forEach((textBox) => 
            {

                var text = textBox as HTMLParagraphElement
                text.contentEditable = 'true'
            })
        }
        else 
        {
            textBoxes.forEach((textBox) => 
            {
                var text = textBox as HTMLParagraphElement
                text.contentEditable = 'false'
            })
        }
    }
}