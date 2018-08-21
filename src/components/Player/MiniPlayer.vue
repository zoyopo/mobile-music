<template>
    <div class="player" v-show="!fullScreen" @click.prevent="open">      
        <transition name="mini">
            <div class="mini-player">
                <div class="player-pic"><img src="../../assets/logo.png" alt=""></div>
                <div class="music-content">
                    <div class="music-content-name">歌名</div>
                    <div class="music-content-artist">作者</div>
                </div>
                <div class="player-play">
                    <i class="fa fa-play-circle-o play-icon"></i>
                </div>
                <div class="player-list">
                    <i class="fa fa-list-ul"></i>
                </div>
            </div>
            <audio ref="audio"></audio>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import animations from "create-keyframe-animation";
export default {
  name: "player",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    
    open() {
      debugger
      this.setFullScreen(true);      
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
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.player {
  width: 100%;
  height: 10%;
  .mini-player {
   
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all 0.4s;
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
    }
    height: 4rem;
    display: flex;
    background: #fff;
    border-top: 1px solid #ddd;
    width: 100%;
    align-items: center;
    .player-pic {
      padding-left: 0.3rem;
      width: 10%;
      img {
        width: 100%;
        display: block;
      }
    }
    .music-content {
      width: 62%;
      padding-left: 3%;
      .music-content-name {
      }
      .music-content-artist {
        font-size: 0.5rem;
        color: #ddd;
      }
    }
    .player-list,
    .player-play {
      color: #a9a2a2;
      font-size: 1.8rem;
      width: 12%;
    }
  }
}
</style>

