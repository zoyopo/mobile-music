<template>
  <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
         <div v-for="(item,index) in picArray" v-bind:key="index" class="slider-item"><img :src="item.picUrl"/></div>
    </div>
    <div v-if="showDot" class="dots">
      <span class="dot" @click="ToPic(index)"  v-bind:key="index" :class="{dotActive: (currentPageIndex) === index }" v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { addClass } from "@/common/js/dom";
import BScroll from "better-scroll";
const COMPONENT_NAME = "slide";
export default {
  name: COMPONENT_NAME,
  props: {
    picArray: {
      type: Array,
      default: []
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    showDot: {
      type: Boolean,
      default: true
    },
    click: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 0.3
    },
    speed: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  mounted() {
   
    this.update();
    window.addEventListener("resize", () => {
      if (!this.slide || !this.slide.enabled) {
        return;
      }
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        if (this.slide.isInTransition) {
          this._onScrollEnd();
        } else {
          if (this.autoPlay) {
            this._play();
          }
        }
        this.refresh();
      }, 60);
    });
  },
  activated() {
    if (!this.slide) {
      return;
    }
    this.slide.enable();
    let pageIndex = this.slide.getCurrentPage().pageX;
    this.slide.goToPage(pageIndex, 0, 0);
    this.currentPageIndex = pageIndex;
    if (this.autoPlay) {
      this._play();
    }
  },
  deactivated() {
    this.slide.disable();
    clearTimeout(this.timer);
  },
  beforeDestroy() {
    this.slide.disable();
    clearTimeout(this.timer);
  },

  // updated() {

  //      this.init();

  // },
  methods: {
    ToPic(pageIndex) {
      //debugger
      var vm = this;
      vm.slide.goToPage(pageIndex, 0, 400);
    },
    update() {
      if (this.slide) {
        this.slide.destroy();
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    refresh() {
      this._setSlideWidth(true);
      this.slide.refresh();
    },
    prev() {
      this.slide.prev();
    },
    next() {
      this.slide.next();
    },
    init() {
      clearTimeout(this.timer);
      this.currentPageIndex = 0;
      this._setSlideWidth();
      if (this.showDot) {
        //debugger
        this._initDots();
      }
      this._initSlide();
      if (this.autoPlay) {
        this._play();
      }
    },
    _setSlideWidth(isResize) {
      this.children = this.$refs.slideGroup.children;
      let width = 0;
      let slideWidth = this.$refs.slide.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slide-item");
        child.style.width = slideWidth + "px";
        width += slideWidth;
      }
      if (this.loop && !isResize) {
        width += 2 * slideWidth;
      }
      this.$refs.slideGroup.style.width = width + "px";
    },
    _initSlide() {
      console.log(this.threshold);
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: this.threshold,
          speed: this.speed
        },
        bounce: false,
        stopPropagation: true,
        click: this.click
      });
      this.slide.on("scrollEnd", this._onScrollEnd);
      this.slide.on("touchEnd", () => {
        if (this.autoPlay) {
          this._play();
        }
      });
      this.slide.on("beforeScrollStart", () => {
        if (this.autoPlay) {
          clearTimeout(this.timer);
        }
      });
    },
    _onScrollEnd() {
      let pageIndex = this.slide.getCurrentPage().pageX;
      this.currentPageIndex = pageIndex;
      if (this.autoPlay) {
        this._play();
      }
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _play() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.slide.next();
      }, this.interval);
    }
  },
  watch: {
    // //添加图片数据的监视 //这他妈也太坑了
    // picArray() {
    //   //debugger;      
    //   this.$nextTick(() => {
    //     //dom渲染完毕的回调之中，进行更新操作
    //     this.update();
    //   });
    // },
    loop() {
      this.update();
    },
    autoPlay() {
      this.update();
    },
    speed() {
      this.update();
    },
    threshold() {
      this.update();
    }
  }
};
</script>
<style lang='scss' scoped>
.slide {
  width: 90%; //width fix
  overflow: hidden;
  margin: 0 auto;
  //min-height: 1px;
  // position: relative;
  // margin: 0 5%;
  height: 10.5rem;
  position: relative;
}
.slide-group {
  overflow: hidden;
  white-space: nowrap;
  // height: 150px;
  // background: red;
  .slider-item {
    // box-sizing: border-box;

    // overflow: hidden;

    // text-align: center;
    // float: left;
    width: 154vw;
    
    // background: yellowgreen;
    float: left;
    a {
      display: block;
      width: 100%;
      overflow: hidden;
      text-decoration: none;
    }
    img {
      display: block;
      width: 100%;
      margin: 0 auto;
    }
  }
}
.dots {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 12px;
  transform: translateZ(1px);
  text-align: center;
  font-size: 0;
  .dot {
    background: #ccc;
    display: inline-block;
    margin: 0 4px;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    &.dotActive {
      width: 20px;
      border-radius: 5px;
      background: #fff;
    }
  }
}
@media screen and(min-width:768px) {
  .slide{
    height: auto;
  }
}
</style>
