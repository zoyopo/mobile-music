<template>
  <transition name="loading">
    <div class="loading-wrapper" style="text-align:center;" v-show="!requestEnd">
      <!-- <div class="loading">
                <span class="loading-text">加载中&nbsp;&nbsp;</span>
                <inline-loading></inline-loading>
            </div> -->
      <!-- <div class="centered">
        <div class="mj">
          <div class="full-head">
            <div class="hat"></div>
            <div class="hat-part"></div>
            <div class="m-head"></div>
          </div>
          <div class="m-body"></div>

          <div class="arms">
            <div class="arm"></div>
            <div class="arm-right"></div>
            <div class="arm-left"></div>
          </div>

          <div class="legs">
            <div class="leg-right">
              <div class="upper-right"></div>
              <div class="lower-right"></div>
            </div>
            <div class="leg-left">
              <div class="upper-left"></div>
              <div class="lower-left"></div>
            </div>
          </div>

          <div class="foot">
            <div class="feet feet-right"></div>
            <div class="feet feet-left"></div>
          </div>

        </div>
      </div> -->
     
        <div id="loading-text">加载中...</div>
        <div id="loading-content"></div>
     
    </div>
  </transition>
</template>

<script>
import { InlineLoading } from "vux";
import { mapGetters } from "vuex";
export default {
  components: {
    InlineLoading
  },
  computed: {
    ...mapGetters(["requestEnd"])
  }
};
</script>
<style lang="scss" scoped>
.loading-enter-active,
.loading-leave-active {
  transition: all 0.5s;
}
.loading-enter,
.loading-leave-to {
  opacity: 0;

  transform: translateX(100%);
}

.loading-enter-to,
.loading-leave {
  opacity: 0.8;
}
.loading-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  background: #706f6f;
  opacity: 0.4;
  z-index: 9999;
#loading-text {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  color: #999;
  width: 100px;
  height: 30px;
  margin: -7px 0 0 -45px;
  text-align: center;
  font-family: 'PT Sans Narrow', sans-serif;
  font-size: 20px;
}

#loading-content {
  display: block;
  position: relative;
  left: 50%;
  top: 50%;
  width: 170px;
  height: 170px;
  margin: -85px 0 0 -85px;
  border: 3px solid #F00;
}

#loading-content:after {
  content: "";
  position: absolute;
  border: 3px solid #0F0;
  left: 15px;
  right: 15px;
  top: 15px;
  bottom: 15px;
}

#loading-content:before {
  content: "";
  position: absolute;
  border: 3px solid #00F;
  left: 5px;
  right: 5px;
  top: 5px;
  bottom: 5px;
}

#loading-content {
  border: 3px solid transparent;
  border-top-color: #4D658D;
  border-bottom-color: #4D658D;
  border-radius: 50%;
  -webkit-animation: loader 2s linear infinite;
  -moz-animation: loader 2s linear infinite;
  -o-animation: loader 2s linear infinite;
  animation: loader 2s linear infinite;
}

#loading-content:before {
  border: 3px solid transparent;
  border-top-color: #D4CC6A;
  border-bottom-color: #D4CC6A;
  border-radius: 50%;
  -webkit-animation: loader 3s linear infinite;
    -moz-animation: loader 2s linear infinite;
  -o-animation: loader 2s linear infinite;
  animation: loader 3s linear infinite;
}

#loading-content:after {
  border: 3px solid transparent;
  border-top-color: #84417C;
  border-bottom-color: #84417C;
  border-radius: 50%;
  -webkit-animation: loader 1.5s linear infinite;
  animation: loader 1.5s linear infinite;
    -moz-animation: loader 2s linear infinite;
  -o-animation: loader 2s linear infinite;
}

@-webkit-keyframes loaders {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loader {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

#content-wrapper {
  color: #FFF;
  position: fixed;
  left: 0;
  top: 20px;
  width: 100%;
  height: 100%;
}

#header
{
  width: 800px;
  margin: 0 auto;
  text-align: center;
  height: 100px;
  background-color: #666;
}

#content
{
  width: 800px;
  height: 1000px;
  margin: 0 auto;
  text-align: center;
  background-color: #888;
}
  // .loading {
  //   position: absolute;
  //   left: 40%;
  //   top: 50%;
  //   color: #000000;
  //   .loading-text {
  //     vertical-align: middle;
  //     display: inline-block;
  //     font-size: 14px;
  //   }
  // }
  // &.loading-enter-active,
  // &.loading-leave-active {
  //   transition: all 0.5s;
  // }
  // &.loading-enter,
  // &.loading-leave-to {
  //   opacity: 0;

  //   transform: translateX(100%);
  // }

  // &.loading-enter-to,
  // &.loading-leave {
  //   opacity: 0.8;
  // }//========================================
  // :root {
  //   --main-bg-color: #b02109;
  //   --first-color: #191918;
  //   --second-color: #e5e5e5;
  // }

  // html,
  // body {
  //   height: 100%;
  //   width: 100%;
  // }
  // body {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   background-color: #222428;
  // }
  // .centered {
  //   // background-color: var(--main-bg-color);
  //   display: flex;
  //   width: 60%;
  //   height: 60%;
  //   align-items: flex-end;
  //   justify-content: center;
  //   // border-radius: 5px;
  //   // border-bottom: 20px solid #e82c0c;
  // }
  // .mj {
  //   justify-content: center;
  //   height: 190px;
  //   margin-left: 500px;
  //   animation: 4s move infinite;
  // }
  // .full-head {
  //   position: relative;
  //   animation: 2s head-animate infinite;
  //   left: 3%;
  //   top: 3%;
  // }

  // .hat {
  //   position: absolute;
  //   margin-top: -13px;
  //   margin-left: 50px;
  //   border-bottom: 10px solid black;
  //   border-left: 3px solid transparent;
  //   border-right: 3px solid transparent;
  //   height: 0;
  //   width: 20px;
  //   transform: rotate(45deg);
  //   box-shadow: 0 2px 0 0 var(--second-color);
  // }
  // .hat-part {
  //   position: absolute;
  //   background-color: black;
  //   margin-top: -26px;
  //   margin-left: 55px;
  //   height: 0;
  //   width: 5px;
  //   height: 50px;
  //   transform: rotate(-45deg);
  //   border-radius: 5px;
  // }
  // .m-head {
  //   position: relative;
  //   width: 13px;
  //   height: 9px;
  //   margin-top: 35px;
  //   margin-left: 50px;
  //   background-color: var(--second-color);
  //   transform: skewY(45deg);
  //   border-radius: 1px;
  // }

  // .m-body {
  //   position: relative;
  //   height: 0;
  //   width: 30px;
  //   margin: 0px;
  //   margin-top: 15px;
  //   border-bottom: 25px solid black;
  //   border-left: 30px solid transparent;
  //   border-right: 35px solid transparent;
  //   transform: rotate(90deg);
  //   border-bottom-left-radius: 25px;
  //   z-index: 1;
  // }
  // /* arms */
  // .arm {
  //   position: relative;
  //   width: 40px;
  //   height: 30px;
  //   border: 9px solid black;
  //   top: -35px;
  //   left: 25px;
  //   border-right: none;
  //   border-bottom: none;
  //   border-radius: 5px;
  //   transform: rotate(-70deg);
  //   animation: 2s arm-animation infinite;
  // }

  // /*Right Leg */
  // .leg-right {
  //   position: relative;
  //   z-index: 1;
  //   -webkit-z-index: 1;
  // }
  // .upper-right {
  //   width: 15px;
  //   height: 50px;
  //   background-color: black;
  //   transform: rotate(-45deg);
  //   margin-left: 45%;
  //   margin-top: -30%;
  //   border-radius: 12px;
  //   z-index: 1;
  //   -webkit-z-index: 1;
  //   animation: 2s upright-animate infinite;
  // }
  // .lower-right {
  //   width: 15px;
  //   height: 50px;
  //   background-color: black;
  //   transform: rotate(30deg);
  //   margin-left: 45%;
  //   margin-top: -15%;
  //   border-radius: 12px;
  //   animation: 2s lowright-animate infinite;
  //   z-index: 1;
  //   -webkit-z-index: 1;
  // }

  // /*Left Leg */
  // .leg-left {
  //   position: relative;
  //   margin-top: -90%;
  //   margin-left: 37%;
  //   z-index: 0;
  //   -webkit-z-index: 0;
  // }
  // .upper-left {
  //   width: 14px;
  //   height: 50px;
  //   transform: rotate(20deg);
  //   border-radius: 12px;
  //   animation: 2s upleft-animate infinite;
  //   background-color: #0e0e0e;
  //   z-index: 0;
  //   -webkit-z-index: 0;
  // }
  // .lower-left {
  //   width: 14px;
  //   height: 50px;
  //   transform: rotate(20deg);
  //   border-radius: 12px;
  //   margin-top: -20%;
  //   margin-left: -14px;
  //   background-color: #0e0e0e;
  //   animation: 2s lowleft-animate infinite;
  //   z-index: 0;
  //   -webkit-z-index: 0;
  // }

  // .feet {
  //   position: relative;
  //   width: 10px;
  //   height: 22px;
  //   border-top-right-radius: 50px;
  //   border-bottom-right-radius: 50px;
  // }

  // .feet-left {
  //   background-color: #0e0e0e;
  //   margin-left: 20%;
  //   margin-top: -24%;
  //   transform: rotate(-90deg);
  //   animation: 2s leftfeet-animate infinite;
  //   z-index: 0;
  //   -webkit-z-index: 0;
  // }
  // .feet-right {
  //   background-color: black;
  //   left: 40%;
  //   margin-top: -10%;
  //   transform: rotate(0deg);
  //   animation: 2s rightfeet-animate infinite;
  //   z-index: 1;
  // }

  // /* animations */
  // @keyframes arm-animation {
  //   50% {
  //     width: 30px;
  //     height: 30px;
  //     border: 9px solid black;
  //     top: -40px;
  //     left: 20px;
  //     border-right: none;
  //     border-bottom: none;
  //     border-radius: 5px;
  //     transform: rotate(-30deg);
  //   }
  // }

  // @keyframes move {
  //   0% {
  //     margin-left: 200px;
  //   }
  //   25% {
  //     margin-left: 100px;
  //   }
  //   50% {
  //     margin-left: 0px;
  //   }
  //   75% {
  //     margin-left: -100px;
  //   }
  //   90% {
  //     margin-left: -200px;
  //   }
  //   100% {
  //     margin-left: 200px;
  //   }
  // }

  // @keyframes head-animate {
  //   50% {
  //     left: -3%;
  //   }
  // }

  // @keyframes upleft-animate {
  //   50% {
  //     transform: rotate(-45deg);
  //     top: -100%;
  //     margin-left: 30%;
  //   }
  // }
  // @keyframes upright-animate {
  //   50% {
  //     transform: rotate(20deg);
  //     top: -100%;
  //     margin-left: 30%;
  //   }
  // }
  // @keyframes lowleft-animate {
  //   50% {
  //     transform: rotate(30deg);
  //     margin-left: 30%;
  //   }
  // }
  // @keyframes lowright-animate {
  //   50% {
  //     transform: rotate(20deg);
  //     height: 55px;
  //     margin-left: 15%;
  //     margin-top: -15%;
  //   }
  // }

  // /*feet animation */
  // @keyframes leftfeet-animate {
  //   50% {
  //     transform: rotate(0deg);
  //     margin-left: 45%;
  //   }
  // }
  // @keyframes rightfeet-animate {
  //   50% {
  //     transform: rotate(-90deg);
  //     left: 10%;
  //     margin-top: -15px;
  //   }
  // }
}
</style>

