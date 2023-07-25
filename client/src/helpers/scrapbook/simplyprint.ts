/**
 * Class to help print all a node and all child nodes of a given element.
 * Allows for css to be applied.
 */
export class Printer 
{
    newWindow:Window & typeof globalThis;
    cssArr:string[]|undefined;
    constructor(selector:string, css?:string[])
    {
        this.cssArr = css
        //get element and make a copy
        var element = (document.querySelector(selector) as HTMLElement)
        var clone = this.cloneNodeAndDescendents(element)
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
    }

    /**
     * Clones all nodes and descendent nodes.
     * Does this so that nodes can then be appeneded to
     * a new window for printing.
     */
    cloneNodeAndDescendents(element:HTMLElement)
    {
        //get childNode
        var clone = element.cloneNode()
        
        element.childNodes.forEach((childNode) => 
        {
            //recusively called cloneNodeAndDescendents on childNodes
            var childNodeWithDescendents =this.cloneNodeAndDescendents(childNode as HTMLElement)
            //get the returned childNodes appended to parent clone
            clone.appendChild(childNodeWithDescendents)
            
        })
        //return the clone node
        return clone
    }

    /**
     * An internal class function for add css styling to the document.
     * @param cssArr 
     */
    addCssStyling(cssArr:string[])
    {
        if (cssArr)
        {
            cssArr.forEach((css:string) => 
            {
                //create a style tag
                var style = document.createElement('style') as HTMLStyleElement
                style.setAttribute('type', 'text/css')

                // style.setAttribute('media', 'print')// to set it to only apply to printing - thought better of this - incase you want to preivew the page - better not to

                //create css node and add style
                var node = document.createTextNode(css)
                style.appendChild(node)
                //add styling to the window document head
                this.newWindow.document.head.appendChild(style)
                
            })
        }
    }
    print()
    {
        //print and then close
        this.newWindow.print()
    }
}
