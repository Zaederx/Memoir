<script setup lang="ts">
import { onMounted } from 'vue';
import { makeScrapbookElementsMovable,makeScrapbookElementsResizable, editText } from '@/helpers/scrapbook/scrapbook.js'


onMounted(() => {
    makeScrapbookElementsMovable()
    makeScrapbookElementsResizable()
    editText()
})


</script>

<template>
<HeadScripts></HeadScripts>
<Banner heading2="Scrapbook"></Banner>
<div class="grid-container">
    <div class="row-1 column-1">
        <Suspense>
            <UploadForm></UploadForm>
        </Suspense>
    </div>
    
    <div id="scrapbook" class="row-1 column-2 scrapbook">
        <!-- Switch Drag or Rotate -->
        <div class="switches">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="switch-drag-rotate">
                <label class="form-check-label" for="flexSwitchCheckDefault">Drag or Rotate</label>
            </div>
            <!-- Switch Fixed or Resizable -->
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="switch-fixed-resizeable">
                <label class="form-check-label" for="flexSwitchCheckDefault">Fixed or Resizeable</label>
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="switch-editable-text">
                <label class="form-check-label" for="flexSwitchCheckDefault">Not Editable | Editable </label>
            </div>
        </div>
        
        <div class="scrapbook-bg" id="scrapbook-bg">
        </div>
    </div>
    <SiteFooter></SiteFooter>
</div>

</template>

<style>
@import '../assets/scrapbook.css';
</style>