import { jsPDF } from 'jspdf'
import { handleElement, handleImage, handleText } from './helpers';
// Convert canvas to pdf - https://stackoverflow.com/questions/23681325/convert-canvas-to-pdf
export class Printer {
    pdf:jsPDF;
    canvas:HTMLCanvasElement = document.createElement('canvas');
    constructor()
    {
        this.pdf = new jsPDF()
    }
    producePdf(element:HTMLElement, )
    {
        //traverse element nodes until your reach end nodes
        this.traverseNodes(element)
        
        const { x, y, width, height } = this.canvas.getBoundingClientRect()
        
        //render end nodes and traverse back up the stack rendering nodes as you go
        this.pdf.addImage(this.canvas, 'JPEG', x, y, width, height, 'journal.pdf')

        // pdf.save('journal.pdf')

        return {pdf:this.pdf,canvas:this.canvas}
    }
    
    traverseNodes(element:HTMLElement)
    {
        console.log('traverseNodes called with element:' + element.nodeName + ':'+ element.innerHTML)
        element.childNodes.forEach((node) => {
            this.traverseNodes(node as HTMLElement);
            this.renderNodeAsCanvasElement(node)
        })

        return this.canvas
        
    }

    renderNodeAsCanvasElement(node:ChildNode)
    {
        //get element
        var element = node as HTMLElement
        console.log(`renderNodeAsCnavasElement called nodeName:${node.nodeName}`)
        switch (node.nodeName) {

            case ''||null:
                return;
            case '#html':
                return;
            case '#body':
                return;
            case '#comment':
                return;
            //draw text
            case '#text':handleText(element, this.canvas)
                break;
            case '#img':handleImage(element as HTMLImageElement, this.canvas)
                break;
            //draw element box
            default:handleElement(element, this.canvas)
                break;
        }
    }
}


class Pdf {

}