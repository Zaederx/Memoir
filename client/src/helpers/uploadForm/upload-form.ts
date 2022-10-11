import { useCurrentImgStore } from "@/stores/currentImg.js"
import { makeScrapbookImagesMovable } from "../scrapbook/scrapbook.js"


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
 * Takes an image file and converts it an img element
 * @param file 
 */
export function fileToScrapbookImg(file:File):HTMLImageElement
{
    //create span
    var img = document.createElement('img') as HTMLImageElement;
    //add image to span
    var imgSrc = URL.createObjectURL(file)
    img.style.backgroundImage = `url(${imgSrc})`;
    img.onclick = () => 
    {
        var imgStore = useCurrentImgStore()
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
 * Removes the image from
 * @param currentImgSrc img source url
 */
export function removeImgFromScrapbook()
{
    console.log('removeImageFromScrapbook called')
    var imgStore = useCurrentImgStore()
    var img = imgStore.getCurrentImg()
    img?.remove()
}