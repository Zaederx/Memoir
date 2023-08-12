import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useCurrentElementStore = defineStore('currentElement', ()=> {
    console.log('current img url called')
    var element = document.createElement('div') as HTMLElement
    const currentImg = ref({element:element})

    function setCurrentElement(element:HTMLElement)
    {
        currentImg.value = {element:element}
    }
    function getCurrentElement()
    {
        return currentImg.value.element
    }

    return { setCurrentElement, getCurrentElement }
})