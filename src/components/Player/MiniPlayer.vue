<template>
  <div class="player" v-if="playList.length>0">
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="player-pic"><img :src="currentSong.album.blurPicUrl||'../static/img/no-pic.png'" alt=""></div>
        <div class="music-content">
          <div class="music-content-name">{{currentSong.name||"暂无歌曲"}}</div>
          <div class="music-content-artist">{{currentSong.singer||"暂无歌者"}}</div>
        </div>
        <div class="player-play">
          <!-- <i class="fa fa-play-circle-o play-icon"></i> -->
          <img :src="playIcon" alt="" @click.stop="play">
        </div>
        <div class="player-list">
          <img :src="listIcon" alt="">
        </div>
        <audio ref="audio" @play="ready" @end="end" @error="error" @timeupdate="updateTime" :src="`http://music.163.com/song/media/outer/url?id=${currentSong.id}.mp3`"></audio>
      </div>

    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import animations from "create-keyframe-animation";
export default {
  name: "player",
  data() {
    return {
      listIcon: require("../../assets/player/music list_black.png"),
      playIcon: "../static/img/music_play_black.png"
    };
  },
  mounted() {},
  methods: {
    play() {
     
      this.setPlayState(!this.playing);    
    },
    open() {
      //debugger
      this.setFullScreen(true);
    },
    ready() {},
    end() {
       this.setPlayState(!this.playing);
    },
    error() {},
    updateTime() {},
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayState: "SET_PLAYING_STATE"
    })
  },
  computed: {
    ...mapGetters(["fullScreen", "playing", "currentSong", "currentIndex","playList"]),
    cdCls() {
      return this.playing ? "play" : "play pause";
    }
  },
  watch: {
    playing(val) {
      this.$nextTick(() => {
        this.playIcon = val
          ? "../static/img/music_pause_black.png"
          : "../static/img/music_play_black.png";
        val ? this.$refs.audio.play() : this.$refs.audio.pause();
      });
    },
    currentSong(){
      this.$nextTick(() => {
       this.$refs.audio.play();
      })
    }
  }
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
      // color: #a9a2a2;
      // font-size: 1.8rem;
      width: 12%;
      img {
        width: 65%;

        display: block;
      }
    }
  }
}
</style>

