
/**
 * For getting css property when not defined in css
 * @param element 
 * @param property 
 */
function getCss(element:HTMLElement, property:string)
{
    console.log('getCss called with element:'+element.nodeName)
    var css = window.getComputedStyle(element, null).getPropertyValue(property)
    return css
}

export function handleText(element:HTMLElement, canvas:HTMLCanvasElement)
{
    console.log('handleText called with element:'+element.nodeName)
    //get parent element
    var parent = element.parentElement as HTMLElement
    //get text
    var text = parent.innerText
    //get font, x,y position
    // const font = element.style.font
    // const font = getCss(element, 'font')
    const {x,y} = parent.getBoundingClientRect()
    //get canvas
    var ctx = canvas.getContext('2d') as CanvasRenderingContext2D 
    // ctx.font = font
    ctx.fillText(text, x+100, y+100)

}


export function handleElement(element:HTMLElement, canvas:HTMLCanvasElement)
{
    console.log('handleElement called with element:' + element.nodeName)
    // const {font, width, height, backgroundColor} = element.style
    const font = getCss(element, 'font')
    const width = getCss(element, 'width')
    const height = getCss(element, 'height')
    const backgroundColor = getCss(element, 'background-color')
    const {x,y} = element.getBoundingClientRect()

    var ctx = canvas.getContext('2d') as CanvasRenderingContext2D 
    ctx.font = font
    ctx.fillStyle = backgroundColor
    ctx.fillRect(x, y, Number(width+100), Number(height+100))
    ctx.fillStyle = ''//default
}

export function handleImage(element:HTMLImageElement, canvas:HTMLCanvasElement)
{
    console.log('handleImage called with element:' + element.nodeName)
    const width = getCss(element, 'width')
    const height = getCss(element, 'height')
    const {x,y} = element.getBoundingClientRect()

    var ctx = canvas.getContext('2d') as CanvasRenderingContext2D 
    ctx.drawImage(element, x+100, y+100, Number(width), Number(height))
    ctx.fillStyle = ''//default
}