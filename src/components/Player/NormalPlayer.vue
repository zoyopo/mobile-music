<template>
  <div class="player" v-show="fullScreen">
    <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="normal-player">
        <m-header :info="info" @back="back" class="top"></m-header>
        <div class="normal-player-cd" ref="cdWrapper">
          <div class="cd" :class="cdCls">
            <img class="image" src="../../assets/logo.png">
          </div>
        </div>
        <div class="normal-player-option"></div>
        <div class="normal-player-progress"></div>
        <div class="normal-player-operation bottom">
          <div v-for="item in playerIcon" :key="item"><img :src="item" alt=""></div>

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import animations from "create-keyframe-animation";
import MHeader from "base/MHeader";
export default {
  components: {
    MHeader
  },
  data() {
    return {
      info: { title: "歌曲名称", description: "hhh" },
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
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN"
    })
  },
  computed: {
    ...mapGetters(["fullScreen"]),
    cdCls() {
      return this.playing ? "play" : "play pause";
    }
  }
};
</script>
<style lang="scss" scoped>
.player {
  width: 100%;
  height: 100%;

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
        .image {
          width: 60%;
          display: block;
          border-radius: 50%;
          border: solid 1px #fff;
        }
      }
    }

    .normal-player-option {
    }
    .normal-player-progress {
    }
    .normal-player-operation {
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
  }

  .normal-enter-active,
  .normal-leave-active {
    transition: all 0.4s;
    .top,
    .bottom {
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
  }

  .normal-enter,
  .normal-leave-to {
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

