<script setup lang="ts">
import { onMounted } from 'vue';
import { makeCollapsibleSideways, addCssStyling, collapsibleCssSideways } from 'simplycollapsible-js'
import { closePictureMenu, getImages, openPictureMenu, removeImgFromScrapbook } from '@/helpers/uploadForm/upload-form'
import { Printer } from 'simplyprint-js'
import printCss from '../assets/print.css'
import { printFormatted } from 'printformatted-js'
onMounted(() => 
{
    const width = 300
    const collapsibleArr = document.querySelectorAll('.collapsible-sideways')
    collapsibleArr.forEach((col) => makeCollapsibleSideways(col as HTMLElement, width))
    
    //make menu functional
    //make add pictures bring up a different Menu
    const btnAddPictures = document.querySelector('#btn-add-pictures') as HTMLDivElement
    btnAddPictures.onclick = () => openPictureMenu()

    //enable submit button
    const btnSubmit = document.querySelector('#btn-submit-images') as HTMLDivElement
    btnSubmit.onclick = () => getImages()

    //enable x (close) button
    const btnClose = document.querySelector('#btn-close') as HTMLDivElement
    btnClose.onclick = () => closePictureMenu()

    //enable remove image button
    const btnRemoveImg = document.querySelector('#btn-remove-pictures') as HTMLButtonElement
    btnRemoveImg.onclick = () => removeImgFromScrapbook()

    //enable print button
    const btnPrint = document.querySelector('#btn-print') as HTMLDivElement
    btnPrint.onclick = () => {
        
        var draggableArr = document.querySelectorAll('.draggable') as NodeListOf<HTMLElement>
        draggableArr.forEach((draggableElement) => 
        {
            //set x as relative to parent element when a x,y = 0,0
            draggableElement.style.left = draggableElement.getAttribute('data-scrapbook-x') as string
            draggableElement.style.top = draggableElement.getAttribute('data-scrapbook-y') as string
        })

        //print
        var cssArr = [printCss]
        var printer = new Printer('#scrapbook', cssArr)
        printer.print()

        //set images in scrapbook back to the original positions
        var scrapbook = document.querySelector('#scrapbook') as HTMLElement
        draggableArr.forEach((draggableElement) => 
        {
            var sbX = scrapbook.getBoundingClientRect().x
            var sbY = scrapbook.getBoundingClientRect().y

            var xRelSB = Number(draggableElement.getAttribute('data-scrapbook-x'))
            var yRelSB = Number(draggableElement.getAttribute('data-scrapbook-y'))

            var orignialX:number = sbX + xRelSB
            var originalY:number = sbY + yRelSB
            //set x as relative to parent element when a x,y = 0,0
            draggableElement.style.left = String(orignialX)
            draggableElement.style.top = String(originalY)
        })
    }

})
</script>

<template>
    <div class="btn-upload-form">
        
        <div id="collapsible" class="collapsible-sideways">
            <div class="title">
                SCRAPBOOK
            </div>
            <div class="collapsible-content-sideways" id="collapse-1">
                <div class="content-background">
                    <div id="menu-1">
                        <div class="cc-title">Menu</div>
                        <div id="btn-add-pictures" class="btn-custom">Add Pictures</div>
                        <div id="btn-remove-pictures" class="btn-custom">Remove Picture</div>
                        <div id="btn-print" class="btn-custom">Print Scrapbook</div>
                    </div>
                    <div id="menu-2" style="display:none">
                        <div class="cc-title">
                            Upload Form
                            <span id="btn-close" class="btn-close">X</span>
                        </div>
                        <form class="form-upload">
                            <input id="file-input" class="input-file" type="file" accept="image/*" multiple>
                            <!-- <input type="submit"> -->
                        </form>
                        <button id="btn-submit-images" type="submit">Submit</button>
                    </div>
                </div>
            </div>
            <div class="collapsible-content" id="collapse-2">
                
            </div>
        </div>
        
    </div>
</template>
<style scoped>
    @import url('../assets/uploadform.css');
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
</style>