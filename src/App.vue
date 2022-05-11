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
    html, body{
      height: 100%;
    }
    #app{
      min-height: 100%;
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
    button{
      border: 1px solid transparent;  //自定义边框
      outline: none;    //消除默认点击蓝色边框效果
      cursor: pointer;
    }
    // popperMessage
    .popperMessage{
      height: 456px;
      background: chocolate;
      padding: 0  !important;
      ul{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        li{
          flex: 1;
          cursor: pointer;
          padding-left: 27px;
          font-size: 18px;
          display: flex;
          align-items: center;
          color: #333;
          .iconfont{
            font-size: 22px;
            color: #eb7561;
            margin-right: 24px;
          }
        }
        li:hover{
          background: #e2e2e2;
        }
      }
    }

    .popoverUser{
      padding: 0 !important;
      height: 520px;
      ul{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        li{
          flex: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding-left: 25px;
          font-size: 18px;
          .iconfont{
            color: #ec7a67;
            font-size: 22px;
            margin-right: 20px;
          }
        }
        li:hover{
          background: #e2e2e2;
        }
      }
    }

    .iClick{
      padding: 0 !important;
      margin: 0;
      min-width: 40px !important;
      margin-top: 5px !important;
      ul{
        li{
          height: 40px;
          line-height: 40px;
          text-align: center;
        }
        li:hover{
          background: #e2e2e2;
        }
      }
    }

    // 发布内容样式
    .publish{
      height: 860px;
      margin-top: 30px !important;
      padding: 0 !important;
      .content{
        h1{
          height: 80px;
          padding: 30px 0 0 26px;
          font-size: 24px;
          font-weight: 530;
          border-bottom: 1px solid #e5e6eb;
        }
        .category, .addtags, .cover, .summary{
          display: flex;
          &>span{
            width: 122px;
            text-align: right;
            font-size: 20px;
            padding-top: 10px;
          }
          .main{
            padding-left: 10px;
            width: 556px;
          }
        }
        .category{
          margin-top: 25px;
          .categorytag{
            height: 120px;
            overflow-y: auto;
          }
          .categorytag::-webkit-scrollbar {
              width: 4px;    
              /*height: 4px;*/
          }
          .categorytag::-webkit-scrollbar-thumb {
              border-radius: 20px;
              -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
              background: rgba(0,0,0,0.2);
          }
          .categorytag::-webkit-scrollbar-track {
              -webkit-box-shadow: inset 0 0 5px transparent;
              border-radius: 0;
              background: transparent;

          }
          .main{
            display: flex;
            flex-wrap: wrap;
            span, &>.el-input{
              display: block;
              width: 110px;
              height: 35px;
              font-size: 17px;
              margin-bottom: 18px;
              background: #f4f5f5;
              color: #86909c;
              margin-right: 6px;
              text-align: center;
              line-height: 35px;
              cursor: pointer;
            }
            .isActive{
              background: #e8f3ff;
              color: #1d7dfa;
            }
          }
        }
        .addtags{
          margin-top: 58px;
          .main{
             .el-select{
              width: 100%;
              input{
                height: 50px;
                font-size: 16px;
              }
            }
          }
        }
        .cover{
          margin-top: 45px;
          .main{
            .el-upload{
              width: 200px;
              height: 107px;
              background: #fafafa;
              border: 1px solid #e5e6eb;
              text-align: center;
              line-height: 107px;
              font-size: 30px;
              img{
                height: 100%;
              }
            }
            &>span{
              margin-top: 20px;
              display: block;
              font-size: 16px;
              color: #909090;
            }
          }
        }
        .summary{
          margin-top: 40px;
          border-bottom: 1px solid #e5e6eb;
          padding-bottom: 30px;
           .main{
             height: 166px;
            .el-textarea{
              textarea{
                width: 100%;
                height: 166px !important;
                font-size: 20px;
              }
            }
          }
        }

        .btns{
          padding-top: 25px;
          display: flex;
          justify-content: flex-end;
          button{
            width: 114px;
            height: 40px;
            margin-right: 20px;
            background: none;
            font-size: 16px;
          }
          button:nth-child(1){
            color: #1d7dfa;
            border: 1px solid #1d7dfa;
          }
          button:nth-child(2){
            background: #1d7dfa;
            color: #fff;
          }
        }
      }
      
      
    }

//      #app::-webkit-scrollbar {
//   width: 4px;    
//   /*height: 4px;*/
// }
// #app::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
//   background: rgba(0,0,0,0.2);
// }
// #app::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
//   border-radius: 0;
//   background: rgba(0,0,0,0.1);
// };
</style>
