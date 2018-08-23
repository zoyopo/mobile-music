<template>

  <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
    <div class="normal-player" v-show="fullScreen" ref='normal'>
      <m-header :info="info" @back="back" class="top"></m-header>
      <div class="normal-player-cd">
        <div class="cd" :class="cdCls">
          <div class="cd-wrapper" ref="cdWrapper">
            <img class="image" :src="currentSong.album.blurPicUrl||'../static/img/no-pic.png'" ref='img'>
          </div>
        </div>
      </div>
      <div class="normal-player-option"></div>
      <div class="normal-player-progress"></div>
      <div class="normal-player-operation bottom">
        <div v-for="(item,index) in playerIcon" :key="index" @click="operate(index)"><img :src="item" alt=""></div>

      </div>
    </div>
  </transition>

</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import animations from "create-keyframe-animation";
import MHeader from "base/MHeader";
import { prefixStyle } from "common/js/dom";
// import Grade from 'grade-js'
const transform = prefixStyle("transform");

export default {
  components: {
    MHeader
  },
  data() {
    return {
      playerIcon: [
        require("../../assets/player/music_list_loop.png"),
        require("../../assets/player/music_previous.png"),
        require("../../assets/player/music_play.png"),
        require("../../assets/player/music_next.png"),
        require("../../assets/player/music list.png")
      ]
    };
  },
  methods: {
    operate(index) {
      //debugger
      switch (index) {
        case 2:
          this.setPlayState(!this.playing);
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
      const height = window.innerHeight * 0.8 * 0.5;

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
      setPlayState: "SET_PLAYING_STATE"
    })
  },
  computed: {
    ...mapGetters(["fullScreen", "playing", "currentSong", "currentIndex"]),
    cdCls() {
      return this.playing ? "play" : "play pause";
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
  background: #ddd;
  width: 100%;
  height: 100%;
  .normal-player-header {
  }
  .normal-player-cd {
    // position: absolute;
    // left: calc(50% - 125px);
    // top: calc(50% - 125px);
    height: 80%;
    .cd {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 100%;
      box-sizing: border-box;

      &.play {
        animation: rotate 20s linear infinite;
      }
      &.pause {
        animation-play-state: paused;
      }
      .cd-wrapper {
        width: 60%;

        .image {
          display: block;
          width: 100%;
          border-radius: 50%;
          border: solid 1px #fff;
        }
      }
    }
  }

  .normal-player-option {
  }
  .normal-player-progress {
  }
  .bottom {
    display: flex;
    text-align: center;
    position: absolute;
    bottom: 1rem;
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
</style>

