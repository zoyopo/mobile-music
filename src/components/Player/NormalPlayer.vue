<template>

  <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">

    <div class="normal-player" v-show="fullScreen" ref='normal'>
      <div class="mask" :style="{'background-image':`url(${backgroundUrl})`}"></div>
      <m-header :info="info" @back="back" class="top"></m-header>

      <div class="normal-player-cd">
        <div class="cd">
          <div class="cd-wrapper" ref="cdWrapper">

            <img class="image" :src="backgroundUrl" ref='img' :class="cdCls">
            <img :src="cdBackgroundUrl" class="bgimage">
          </div>
        </div>
      </div>
      <div class="normal-player-option"></div>
      <progress-bar @barOnChange="barOnChange" class="progress-bar-outer" :ratio="ratio" :sttime="sttime" :edtime="edtime"></progress-bar>
      <div class="normal-player-operation bottom">
        <div v-for="(item,index) in playerIcon" :key="index" @click="operate(index)"><img :src="item" alt="" :style="index===2?'width:60%':''"></div>

      </div>
    </div>
  </transition>

</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import animations from "create-keyframe-animation";
import MHeader from "base/MHeader";
import { prefixStyle } from "common/js/dom";
import ProgressBar from "base/ProgressBar";
// import Grade from 'grade-js'
const transform = prefixStyle("transform");
import { playMode } from "common/js/config";
import { shuffle } from "common/js/util";
export default {
  components: {
    MHeader,
    ProgressBar
  },
  data() {
    return {
      cdBackgroundUrl: require("../../assets/player/disc.png"),
      playerIcon: [
        require("../../assets/player/sequence.png"),
        require("../../assets/player/music_previous.png"),
        require("../../assets/player/music_play.png"),
        require("../../assets/player/music_next.png"),
        require("../../assets/player/music list.png")
      ]
    };
  },
  props: {
    currentTime: {
      type: Number,
      default: 0
    }
  },
  methods: {
    barOnChange(finalRatio) {
      //debugger
      // 拖动小球=>改变音乐播放
      this.$parent.$refs.miniPlayer.$refs.audio.currentTime =
        this.playTime / 1000 * finalRatio;
    },
    format(totalSecond) {
      totalSecond = totalSecond | 0;
      const minute = (totalSecond / 60) | 0;
      const second = this.pad(totalSecond % 60);
      return `${minute}:${second}`;
    },
    pad(num, count = 2) {
      let numStrLength = num.toString().length;
      while (numStrLength < count) {
        num = "0" + num;
        numStrLength++;
      }
      return num;
    },
    operate(index) {
      let currrentIndex = 0;
      if (index == 0) {
        let mode = (this.playerMode + 1) % 3;
        this.setPlayerMode(mode);
        let imgName = playMode[mode.toString()];
        //debugger
        this.playerIcon[0] = require(`../../assets/player/${imgName}.png`);

        if (imgName === "random") {
          let newPlayList = shuffle(this.songSequence);
          this.setPlayList(newPlayList);
          let currentIndex = newPlayList.findIndex(item => {
            return item.id == this.currentSong.id;
          });
          this.setCurrentIndex(currentIndex);
        } else if (imgName === "sequence") {
          let seqIndex = this.songSequence.findIndex(item => {
            return item.id == this.currentSong.id;
          });
          this.setCurrentIndex(seqIndex);
        }
      }

      if (index === 2) {
        this.setPlayState(!this.playing);
        // 修复ios上面滚动无法暂停
        if (this.playing) {
          this.$refs.img.classList.add("play");
        } else {
          let wrapperTrans = getComputedStyle(this.$refs.cdWrapper).transform;
          let imgTrans = getComputedStyle(this.$refs.img).transform;
          this.$refs.cdWrapper.style.transform =
            wrapperTrans === "none"
              ? imgTrans
              : imgTrans.concat(" ", wrapperTrans);
          this.$refs.img.classList.remove("play");
        }
        return;
      }
      if (index === 1) {
        if (!this.songIsReady) {
          return;
        }
        //修正下一曲、上一曲的进度条未重置的问题
        //this.currentTime=0;
        //循环播放=>置位0
        //this.$parent.$refs.miniPlayer.$refs.audio.currentTime = 0;
        if (this.playerMode === 1) {
          this.$parent.$refs.miniPlayer.$refs.audio.currentTime = 0;
          currrentIndex = this.currentIndex;
        } else {
          currrentIndex = this.currentIndex - 1;
        }

        if (currrentIndex === -1) {
          currrentIndex = this.playList.length - 1;
        }
        this.setCurrentIndex(currrentIndex);
        this.setSongReady(false);
         this.$refs.img.classList.add("play");//上一曲，下一曲的时候加上旋转样式
        return;
      }
      if (index === 3) {
        if (!this.songIsReady) {
          return;
        }
        //修正下一曲、上一曲的进度条未重置的问题
        // this.$parent.$refs.miniPlayer.$refs.audio.currentTime = 0;
        // debugger
        if (this.playerMode === 1) {
          this.$parent.$refs.miniPlayer.$refs.audio.currentTime = 0;
          currrentIndex = this.currentIndex;
        } else {
          currrentIndex = this.currentIndex + 1;
        }
        if (currrentIndex === this.playList.length) {
          //debugger
          currrentIndex = 0;
        }
        this.setCurrentIndex(currrentIndex);
        this.setSongReady(false);
         this.$refs.img.classList.add("play");//上一曲，下一曲的时候加上旋转样式
        return;
      }
    },
    back() {
      this.setFullScreen(false);
    },
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale();

      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      };

      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 400,
          easing: "linear"
        }
      });

      animations.runAnimation(this.$refs.cdWrapper, "move", done);
    },
    afterEnter() {
      animations.unregisterAnimation("move");
      this.$refs.cdWrapper.style.animation = "";
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = "all 0.4s";
      const { x, y, scale } = this._getPosAndScale();
      this.$refs.cdWrapper.style[
        transform
      ] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener("transitionend", done);
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = "";
      this.$refs.cdWrapper.style[transform] = "";
    },
    _getPosAndScale() {
      const targetwidth = window.innerWidth * 0.1;
      const paddingLeft = 4.8;
      const paddingBottom = (64 - targetwidth) / 2;
      const headerHeight = 49;
      const height = window.innerHeight * 0.6 * 0.5;

      const width = window.innerWidth * 0.6;
      const scale = targetwidth / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - headerHeight - height - paddingBottom;
      return {
        x,
        y,
        scale
      };
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setSongReady: "SET_SONG_READY",
      setPlayerMode: "SET_PLAYER_MODE",
      setPlayList: "SET_PLAY_LIST"
    })
  },
  computed: {
    ...mapGetters([
      "fullScreen",
      "playing",
      "currentSong",
      "currentIndex",
      "playList",
      "songIsReady",
      "playerMode",
      "songSequence"
    ]),
    sttime() {
      return this.format(this.currentTime);
    },
    edtime() {
      return this.format(this.playTime / 1000);
    },
    playTime() {
      let music =
        this.currentSong.hMusic ||
        this.currentSong.bMusic ||
        this.currentSong.lMusic ||
        this.currentSong.mMusic;
      if (music) {
        return music.playTime;
      } else {
        return 1;
      }
    },
    ratio() {
      return this.currentTime / (this.playTime / 1000);
    },
    backgroundUrl() {
      return this.currentSong.album.blurPicUrl || "../static/img/no-pic.png";
    },

    cdCls() {
      return "play";
    },
    info() {
      return {
        title: this.currentSong.name || "暂无歌曲",
        description: this.currentSong.singer || "暂无歌者"
      };
    }
  },
  watch: {
    playing(val) {
      this.playerIcon[2] = val
        ? require("../../assets/player/music_pause.png")
        : require("../../assets/player/music_play.png");
    },
    currentSong() {
      // this.$nextTick(() => {
      //   Grade(this.$refs.normal,'.image');
      // });
    }
  }
};
</script>
<style lang="scss" scoped>
.normal-player {
  background: #cfd0c6;
  width: 100%;
  height: 100%;
  .mask {
    // 遮罩=> 模糊效果
    position: absolute;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0.5;
    width: 100%;
    z-index: -1111;
    filter: blur(10px);
    -webkit-filter: blur(10px);
  }
  // .normal-player-header {
  // }
  .normal-player-cd {
    // position: absolute;
    // left: calc(50% - 125px);
    // top: calc(50% - 125px);
    height: 60%;
    .cd {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 100%;
      box-sizing: border-box;

      .cd-wrapper {
        width: 60%;
        border-radius: 50%;
        border: double #9c9999 10px;
        position: relative;
        .bgimage {
          position: absolute;
          left: -3rem;
          top: -3rem;
          width: 140%;
        }
        .image {
          display: block;
          width: 100%;
          border-radius: 50%;
          &.play {
            animation: rotate 20s linear infinite; /*cd旋转*/
          }
          &.pause {
            animation-play-state: paused; /*cd停止旋转*/
          }
        }
      }
    }
  }

  // .normal-player-option {
  // }
  .progress-bar-outer {
    bottom: 10rem;
    position: absolute;
  }

  .bottom {
    display: flex;
    text-align: center;
    position: absolute;
    align-items: center;
    bottom: 3rem;
    div {
      width: 20%;
      img {
        width: 45%;
      }
    }
  }
  &.normal-enter-active,
  &.normal-leave-active {
    transition: all 0.4s;
    .top,
    .bottom {
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
  }
  &.normal-enter,
  &.normal-leave-to {
    opacity: 0;
    .top {
      transform: translate3d(0, -100px, 0);
    }
    .bottom {
      transform: translate3d(0, 100px, 0);
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
/*媒体查询部分*/
@media screen and (min-width: 768px) {
  .normal-player .normal-player-cd .cd .cd-wrapper {
    width: 200px;
    .bgimage {
      position: absolute;
      left: -4.1rem;
      top: -4.1rem;
      width: 165%;

      .image {
        width: 200px;
      }
    }
  }
}
</style>

