<template>

    <div id="main" class="main">    
        <slot></slot>
    </div>
</template>

<style>
html
{
    animation: fadeInAnimation ease 3s;
	animation-iteration-count: 1;
	animation-fill-mode: forwards;
}
.main {
    height: 1000px;
    background-image: url(../assets/photos-g9761b2a74_1920.jpg);
    background-repeat: no-repeat;
    /* fixed - creates cool effect while scrolling */
    background-attachment: fixed;
    background-size: 100% 100%;
    display:grid;
    justify-content: center;

    /* Fade in */
    /* background-color:black; */
    /* position: absolute; */
    /* z-index: 1; */
    /* top: 0; */
    /* left: 0; */
    /* width: 100%; */
    /* min-height: 100%; */
    
    
} 


.background {
    
}


@keyframes fadeInAnimation 
{
	0% {
        /* background: black; */
		opacity: 0;
	}
    /* 50% {
        background: rgb(27, 27, 27);
	} */
	100% {
        /* background: rgb(69, 69, 69); */
		opacity: 1;
	}
}

</style>