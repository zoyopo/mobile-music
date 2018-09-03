<template>

  <div class="progress-bar">
    <div class="rogress-bar-sttime">{{sttime}}</div>
    <div class="progress-bar-wrapper">

      <div class="progress-bar-inner" ref="inner">

      </div>

      <div class="progress-bar-btn" ref="btn" @touchstart.prevent.stop="btnOnTouchStart" @touchmove.prevent.stop="btnOnTouchMove" @touchend.prevent.stop="btnOnTouchEnd">
      </div>

    </div>
    <div class="rogress-bar-edtime">{{edtime}}</div>
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
      const progressLength = this.$refs.inner.style.width;
      this.touchState.progessWidth =
        progressLength.length > 2
          ? progressLength.substring(0, progressLength.length - 2) * 1
          : 0;
    },
    btnOnTouchMove(e) {
      //debugger;
      if (!this.touchState.isInit) {
        return;
      }
      const offSetX = e.touches[0].pageX - this.touchState.startX;
      const barWidth = window.innerWidth * 0.7;
      const progressWidth = Math.min(
        barWidth,
        Math.max(0, this.touchState.progessWidth + offSetX)
      );
      this.touchState.finalRatio = progressWidth / barWidth;
      this.setOffSetWidth(progressWidth);
    },
    
    btnOnTouchEnd(e) {
      this.touchState.isInit = false;
      //将比例传给父页面，改变歌曲进度
      this.$emit("barOnChange", this.touchState.finalRatio);
    },
    setOffSetWidth(width) {
      this.$refs.inner.style.width = width + "px";
      this.$refs.btn.style.left = width + "px";
    }
  },
  watch: {
    // 百分比变化使得小球，进度条变化
    ratio(newRatio) {
      if (!this.touchState.isInit && newRatio >= 0) {
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
  display: flex;
  align-items: center;
  .progress-bar-wrapper {
    //display: inline-block;
    width: 70%;
    height: 2px;
    margin: 0 auto;
    position: relative;
    border-radius: 50px;
    background-color: #a59c9c;
    .progress-bar-inner {
      background: #fff;
      height: 2px;
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
  }
  .rogress-bar-sttime {
    //display: inline-block;

    font-size: 0.5rem;
    color: #fff;
    position: absolute;
    left: 1.6rem;
  }
  .rogress-bar-edtime {
    //display: inline-block;

    font-size: 0.5rem;
    color: #fff;
    position: absolute;
    right: 1.6rem;
  }
}
</style>

