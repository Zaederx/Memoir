import { useCurrentElementStore } from "@/stores/currentImg.js"
import { makeScrapbookImagesMovable } from "../scrapbook/scrapbook.js"
import { Printer } from "simplyprint-js"
import printCss from '../../assets/print.css'
import { printFormattedv2 } from "printformatted-js"

/**
 * Opens picture menu and hides main menu
 */
export function openPictureMenu()
{
    console.log('open picture menu called')
    //hide main menu
    const menu1 =  document.querySelector('#menu-1') as HTMLDivElement
    menu1.style.display = 'none'
    //show picture menu
    const menu2 =  document.querySelector('#menu-2') as HTMLDivElement
    menu2.style.display = 'block'
}

/**
 * Closes picture menu and hides main menu
 */
export function closePictureMenu()
{
    console.log('close picture menu called')
    //show main menu
    const menu1 =  document.querySelector('#menu-1') as HTMLDivElement
    menu1.style.display = 'block'
    //hide picture menu
    const menu2 =  document.querySelector('#menu-2') as HTMLDivElement
    menu2.style.display = 'none'
}

/**
 * Retrieves/ gets images from input
 * and adds them to scrapbook.
 */
export function getImages()
{
    const input = document.querySelector('#file-input') as HTMLInputElement

    if (input.files)
    {
        for (let index = 0; index < input.files.length; index++) 
        {
            var file = input.files[index]
            addFileToScrapbook(file)
        }
    }
    
}

/**
 * Adds the img file as an img element to the scrapbook.
 * @param file 
 */
export function addFileToScrapbook(file:File)
{
    //get file img as html element displaying an image
    var spanImg = fileToScrapbookImg(file);
    //put image into hmtl div
    var scrapbook = document.querySelector('#scrapbook-bg') as HTMLDivElement
    scrapbook.append(spanImg)
    //reapply makeScrapbookImagesMovable function
    makeScrapbookImagesMovable()
}


/**
 * Takes an image file and converts it an `div` element containing an image
 * Important that this stay a `div` and not be an `img` element as `div`s are resizable.
 * `img` is not directly resiable but can be put at a percentag of a containing resiable div. The first option of just using a `div` instead of `img` is easier
 * @param file 
 */
export function fileToScrapbookImg(file:File):HTMLImageElement
{
    //create span
    var img = document.createElement('div') as HTMLImageElement;
    //add image to span
    var imgSrc = URL.createObjectURL(file)
    console.log('imgSrc:',imgSrc)
    img.style.backgroundImage = `url(${imgSrc})`;
    //set images to tag set self as current image on click
    img.onclick = () => 
    {
        var imgStore = useCurrentElementStore()
        //set the current image's url in store
        imgStore.setCurrentImg(img)
    }
    //add draggable and rotatible classes
    img.classList.add('draggable')
    img.classList.add('rotatible')
    img.classList.add('resizeable')
    return img
}


/**
 * Removes the image from
 * @param currentImgSrc img source url
 */
export function removeImgFromScrapbook()
{
    console.log('removeImageFromScrapbook called')
    var imgStore = useCurrentElementStore()
    var img = imgStore.getCurrentImg()
    img?.remove()
}


export function addTextToScrapbook()
{
    var scrapbook = document.querySelector('#scrapbook-bg') as HTMLElement
    var text = document.createElement('p') as HTMLParagraphElement
    text.classList.add('draggable')
    text.classList.add('rotatible')
    text.classList.add('resizeable')

    text.onclick = () =>
    {

    }
    scrapbook.append(text)
}

export function printScrapbook()
{
    //set to the position that you will need it to be in for printing
    const draggableArr = document.querySelectorAll('.draggable') as NodeListOf<HTMLElement>
    draggableArr.forEach((draggableElement) => 
    {
        printFormattedv2(false,false,'yellow', 'draggable elements being set to print position')
        //store the previous x and y position (before moving element into print position)
        const preX = draggableElement.style.left
        const preY = draggableElement.style.top
        draggableElement.setAttribute('preX',preX)
        draggableElement.setAttribute('preY',preY)
        printFormattedv2(false,false,'yellow','preX:',preX,'preY:',preY)
        //set x as relative to parent element (scrapbook)when sbX,sbY = 0,0 (sb = scrapbook)
        draggableElement.style.left = /* add scrappbook absolute position - which is 0  */ draggableElement.getAttribute('data-scrapbook-x') as string + 'px'
        draggableElement.style.top = /* add scrappbook absolute position - which is 0  */ draggableElement.getAttribute('data-scrapbook-y') as string + 'px'

    })

    //print
    var cssArr = [printCss]
    var printer = new Printer('#scrapbook', cssArr)

    //set images in scrapbook back to the original positions
    //must do this step before calling print - otherwise it breaks out of the function
    draggableArr.forEach((draggableElement) => 
    {
        printFormattedv2(false,false,'yellow', 'draggable elements being set back to previous position')
        const preX = draggableElement.getAttribute('preX')
        const preY = draggableElement.getAttribute('preY')
        printFormattedv2(false,false,'yellow','preX:',preX,'preY:',preY)
        //set x as relative to parent element when a x,y = 0,0
        draggableElement.style.left = preX
        draggableElement.style.top = preY
    })

    printer.print()
}