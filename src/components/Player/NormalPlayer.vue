<template>
    <div class="player" v-show="fullScreen">
        <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
            <div class="normal-player">
                <div class="normal-player-header">1111111</div>
                <div class="normal-player-cd" ref="cdWrapper">
                    <div class="cd" :class="cdCls">
                        <img class="image" src="../../assets/logo.png">
                    </div>
                </div>
                <div class="normal-player-option"></div>
                <div class="normal-player-progress"></div>
                <div class="normal-player-operation"></div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import animations from "create-keyframe-animation";
export default {
  data() {
    return {};
  },
  methods: {
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
    height: 100%;
    .normal-player-header {
    }
    .normal-player-cd {
      .cd-wrapper {
        position: absolute;
        left: 10%;
        top: 0;
        width: 80%;
        height: 100%;
        .cd {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border: 10px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          &.play {
            animation: rotate 20s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
          .image {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
    }
    .normal-player-option {
    }
    .normal-player-progress {
    }
    .normal-player-operation {
    }
  }
}
</style>

