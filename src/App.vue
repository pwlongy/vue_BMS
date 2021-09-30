<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
    /* 确定编码格式 */
    @charset 'utf-8';
 
    /* 重置样式 */
    html,body,ul,li,ol,dl,dd,dt,p,h1,h2,h3,h4,h5,h6,form,fieldset,legend,img,figure,figcaption{
        margin: 0;
        padding: 0;
    }
   
    *{
        /* 所有元素触发怪异盒模型 */
        box-sizing: border-box;
    }
    h1,h2,h3,h4,h5,h6{
        font-size: 16px;
        font-weight: normal;
    }
    ul,ol,li{
        list-style: none;
    }
    b,strong{
        font-weight: normal;
    }
    em,i{
        font-weight: normal;
        font-style:normal;
    }
    a,u{
        text-decoration: none;
    }
    img{
        border: 0;
    }
    input{
        outline: none;      /*清除input 聚焦时的蓝色边框*/
    }
    .clear_fix:after{
        content: '.';
        height: 0;
        clear: both;
        display: block;
        overflow: hidden;
        visibility: hidden;
    }
    .clear_fix{
        /* 解决 低版本的IE浏览器不兼容伪对象 */
        zoom: 1;
    }
    .float_left{
        float: left;
    }
    .float_right{
        float: right;
    }
    .font-none{
        color: black !important;
    }
</style>
