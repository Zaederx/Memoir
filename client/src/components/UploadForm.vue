<script setup lang="ts">
import { onMounted } from 'vue';
import { makeCollapsibleSideways } from 'simplycollapsible-js'
import { makeScrapbookImagesMovable } from '@/helpers/scrapbook/scrapbook.js'

onMounted(() => 
{
    //make the scrapbook menu collapsible
    var width = 300
    const collapsibleArr = document.querySelectorAll('.collapsible')
    collapsibleArr.forEach((col) => makeCollapsibleSideways(col as HTMLElement, width))
    
    //make menu functional
    //make add pictures bring up a different Menu
    const btnAddPictures = document.querySelector('#btn-add-pictures') as HTMLDivElement
    btnAddPictures.onclick = () => openPictureMenu()

    const btnSubmit = document.querySelector('#btn-submit-images') as HTMLDivElement
    btnSubmit.onclick = () => getImages()
})


    
    function openPictureMenu()
    {
        console.log('open picture menu called')
        //hide cuurent menu
        const menu1 =  document.querySelector('#menu-1') as HTMLDivElement
        menu1.style.display = 'none'
        //show new picture menu
        const menu2 =  document.querySelector('#menu-2') as HTMLDivElement
        menu2.style.display = 'block'
    }

    function closePictureMenu()
    {
        //hide cuurent menu
        const menu1 =  document.querySelector('#collapse-1') as HTMLDivElement
        menu1.hidden = false
        //show new picture menu
        const menu2 =  document.querySelector('#collapse-2') as HTMLDivElement
        menu2.hidden = true
    }

    function getImages()
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

    function addFileToScrapbook(file:File)
    {
        //get file img as html element displaying an image
        var spanImg = fileToScrapbookImg(file);
        //put image into hmtl div
        var scrapbook = document.querySelector('#scrapbook-bg') as HTMLDivElement
        scrapbook.append(spanImg)

        //reapply makeScrapbookImagesMovable function
        makeScrapbookImagesMovable()
    }
    function fileToScrapbookImg(file:File):HTMLElement
    {
        //create span
        var span = document.createElement('img') as HTMLElement;
        //add image to span
        var imgSrc = URL.createObjectURL(file)
        span.style.backgroundImage = `url(${imgSrc})`;
        //add draggable and rotatible classes
        span.classList.add('draggable')
        span.classList.add('rotatible')
        return span
    }

</script>

<template>
    <div class="btn-upload-form">
        
        <div id="collapsible" class="collapsible">
            <div class="title">
                SCRAPBOOK
            </div>
            <div class="collapsible-content" id="collapse-1">
                <div class="content-background">
                    <div id="menu-1">
                        <div class="cc-title">Menu</div>
                        <div id="btn-add-pictures" class="btn-custom">Add Pictures</div>
                        <div id="btn-remove-pictures" class="btn-custom">Remove Picture</div>
                        <div id="btn-print" class="btn-custom">Print Scrapbook</div>
                    </div>
                    <div id="menu-2" style="display:none">
                        <div class="cc-title">Upload Form</div>
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
    @import url('../assets/base.css');
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

    .btn-upload-form
    {
        margin-top:20vh;
        margin-left: 30%;
        z-index: 3;
        position: relative;
    }
    .title
    {
        display:inline-block;
        font-family: 'Roboto', sans-serif;
        font-size: 30px;
        padding:10px;
        writing-mode: vertical-rl;
        text-orientation: upright;
        position: relative;
        margin-top: 30px;
        margin-left: 20px;
        /* left:130px; */
        z-index: 2;
        pointer-events:none
    }

    /* Collapse CSS */
    .collapsible
    {
        /* border radius for  */
        border-top-left-radius: 50px;
        border-top-right-radius: 50px;
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;

        margin-left: 30px;
        cursor: pointer;
        position: relative;
        margin-bottom:400px;
        background-color: var(--teal);/* adjust as needed */
        height: 400px;/* adjust as needed */
        width: 100px;/* adjust as needed */
        z-index: 1;
    }

    .collapsible:hover
    {
        background-color: var(--mint) /* adjust as needed */
    }

    /* Collapse content CSS */
    .collapsible-content
    {
        border-top-left-radius: 0;
        border-top-right-radius: 5%;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 5%;

        position:relative;
        background-color: var(--teal);
        overflow:hidden;
        margin-top: -270px;
        margin-left: 95px;
        max-width: 0px;
        height: 300px;

        /* adjust as needed */
        -webkit-transition: max-width 2s ease-out;
        -moz-transition: max-width 2s ease-out;
        transition: max-width 2s ease-out;
        z-index: 3;
    }
    
    .content-background
    {
        background-color:white;
        border-radius: 5%;
        margin-top: 25px;
        margin-left: 20px;
        max-width: 250px;
        height: 250px;
    }

    .form-upload
    {
        padding: 40px;
        width: 30px;
        height: 100px;
        background-color: white;
    }
    .input-file
    {

    }

    .cc-title
    {
        margin-left:auto;
        margin-right:auto;
        width: 25%;
    }
    .btn-custom
    {
        background-color: var(--light-grey);
        border-radius: 5px;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
</style>