import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useCurrentImgStore = defineStore('currentImg', ()=> {
    console.log('current img url called')
    var img = document.createElement('img')
    const currentImg = ref({img:img})

    function setCurrentImg(img:HTMLImageElement)
    {
        currentImg.value = {img:img}
    }
    function getCurrentImg()
    {
        return currentImg.value.img
    }

    return { setCurrentImg, getCurrentImg }
})