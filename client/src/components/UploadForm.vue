<script setup lang="ts">
import { onMounted } from 'vue';
import { makeCollapsibleSideways } from 'simplycollapsible-js'


onMounted(() => 
{
    var width = 300
    var collapsibleArr = document.querySelectorAll('.collapsible')
    collapsibleArr.forEach((col) => makeCollapsibleSideways(col as HTMLElement, width))
})
</script>

<template>
    <div class="btn-upload-form">
        <div class="title">
            SCRAPBOOK
        </div>
        <div id="collapsible" class="collapsible section1">
            <div class="collapsible-content">
                <div class="content-background">
                    <div>Menu</div>
                    <div class="btn-custom">Add Pictures</div>
                    <div class="btn-custom">Remove Picture</div>
                    <div class="btn-custom">Print Scrapbook</div>
                </div>
            </div>
        </div>
        <div id="collapsible" class="collapsible section2" hidden>
            <div class="collapsible-content">
                <div class="content-background">
                    <form class="form-upload">
                    <input class="input-file" type="file" accept="image/*" multiple>
                    <input type="submit">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

    .btn-upload-form
    {
        margin-top:20vh;
        margin-left: 30%;
        z-index: 3;
    }
    .title
    {
        font-family: 'Roboto', sans-serif;
        font-size: 30px;
        padding:10px;
        margin-top: 10px;
        writing-mode: vertical-rl;
        text-orientation: upright;
        position: fixed;
        margin-top: 30px;
        margin-left: 45px;
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
        position: fixed;
        background-color: rgb(36, 123, 121);/* adjust as needed */
        height: 400px;/* adjust as needed */
        width: 100px;/* adjust as needed */
        z-index: 1;
    }

    .collapsible:hover
    {
        background-color: rgb(53, 200, 200) /* adjust as needed */
    }
    
    /* Collapse content CSS */
    .collapsible-content
    {
        border-top-left-radius: 0;
        border-top-right-radius: 5%;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 5%;

        position:fixed;
        background-color: rgb(36, 123, 121);
        overflow:hidden;
        margin-top: 50px;
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
</style>