import { jsPDF } from 'jspdf'
import { handleElement, handleImage, handleText } from './helpers';
// Convert canvas to pdf - https://stackoverflow.com/questions/23681325/convert-canvas-to-pdf
export class Printer 
{
    newWindow:Window & typeof globalThis;
    cssArr:string[]|undefined;
    constructor(selector:string, css?:string[])
    {
        this.cssArr = css
        //get element and make a copy
        var element = (document.querySelector(selector) as HTMLElement)
        var clone = this.cloneNodeAndDescendents(element,0)
        console.log('clone:', clone)
        //prepare a new window
        var url = ''
        var target = '_blank'//only option that works in safari it seems
        var windowFeatures = "popup=true,left=0,top=0,width=300,height=300"
        this.newWindow = window.open(url, target, windowFeatures) as Window & typeof globalThis

        //add css styling
        if(this.cssArr)
        {
            this.addCssStyling(this.cssArr)
        }
        //write contents to window
        this.newWindow ? this.newWindow.document.body.appendChild(clone) : null
        //closes an output stream and forces set data to display
        // this.newWindow ? this.newWindow.document.close() : null
        console.log('newWindow.document:',this.newWindow.document)
    }

    cloneNodeAndDescendents(element:HTMLElement,i:number)
    {
        //get childNode
        var clone = element.cloneNode() as HTMLElement
        //change class to get it ready for printing
        if (i == 0)
        {
            clone.setAttribute('class', 'scrapbook-print')
        }
        i++
        element.childNodes.forEach((childNode) => 
        {
            //recusively called cloneNodeAndDescendents on childNodes
            var childNodeWithDescendents =this.cloneNodeAndDescendents(childNode as HTMLElement,i)
            //get the returned childNodes appended to parent clone
            clone.appendChild(childNodeWithDescendents)
            
        })
        //return the clone node
        return clone
    }

    addCssStyling(cssArr:string[])
    {
        if (cssArr)
        {
            cssArr.forEach((css) => 
            {
                //set style of doc to be landscape
                var style = document.createElement('style') as HTMLStyleElement
                style.setAttribute('type', 'text/css')
                // style.setAttribute('media', 'print')
                style.appendChild(document.createTextNode(css))
                //add styling to the window document head
                this.newWindow.document.head.appendChild(style)
                
            })
        }
    }
    print()
    {
        
        console.log(this.newWindow)
        //print and then close
        this.newWindow.print()

    }
}
