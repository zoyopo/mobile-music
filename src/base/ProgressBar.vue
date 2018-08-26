<template>

  <div class="progress-bar">

    <div class="progress-bar-wrapper">

      <div class="progress-bar-inner" ref="inner">

      </div>

      <div class="progress-bar-btn" ref="btn" @touchstart.prevent.stop="btnOnTouchStart" @touchmove.prevent.stop="btnOnTouchMove" @touchend.prevent.stop="btnOnTouchEnd">
      </div>
      <div class="rogress-bar-sttime">{{sttime}}</div>
      <div class="rogress-bar-edtime">{{edtime}}</div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    ratio: {
      type: Number,
      default: 0
    },
    sttime: {
      type: String,
      default: ""
    },
    edtime: {
      type: String,
      default: ""
    }
  },
  created() {
    this.touchState = {};
  },
  methods: {
    btnOnTouchStart(e) {
      //debugger
      this.touchState.isInit = true;
      this.touchState.startX = e.touches[0].pageX;
      const progressLength=this.$refs.inner.style.width;
      this.touchState.progessWidth = progressLength.length>2?progressLength.substring(0,progressLength.length-2)*1:0;
    },
    btnOnTouchMove(e) {
      //debugger;
      if (!this.touchState.isInit) {
        return;
      }
      const offSetX =  e.touches[0].pageX - this.touchState.startX;
      const barWidth=window.innerWidth * 0.7;
      const progressWidth = Math.min(
        barWidth,
        Math.max(0, this.touchState.progessWidth + offSetX)
      );
      this.touchState.finalRatio=progressWidth/barWidth;
      this.setOffSetWidth(progressWidth);
    },
    btnOnTouchEnd(e) {
      this.touchState.isInit = false;
      this.$emit('barOnChange',this.touchState.finalRatio);
    },
    setOffSetWidth(width) {
      this.$refs.inner.style.width = width + "px";
      this.$refs.btn.style.left = width + "px";
    }
  },
  watch: {
    ratio(newRatio) {
      if(!this.touchState.isInit&&newRatio>=0){
      let currentWidth = window.innerWidth * 0.7 * newRatio - 9;
      this.setOffSetWidth(currentWidth);
    }
  }
  }
};
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 100%;
  // display: flex;

  .progress-bar-wrapper {
    //display: inline-block;
    width: 70%;

    margin: 0 auto;
    position: relative;
    border-radius: 50px;
    background-color: #a59c9c;
    .progress-bar-inner {
      background: #fff;
      height: 1px;
      width: 0px;
    }
    .progress-bar-btn {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      position: absolute;
      border: solid 6px #9bca4f;
      top: -7px;
      background: #fff;
      box-sizing: border-box;

      left: -9px;
    }
    .rogress-bar-sttime {
      //display: inline-block;
      position: absolute;
      top: -8px;
      left: -34px;
      font-size: 0.5rem;
      color: #fff;
    }
    .rogress-bar-edtime {
      //display: inline-block;
      position: absolute;
      top: -8px;
      right: -34px;
      font-size: 0.5rem;
      color: #fff;
    }
  }
}
</style>

