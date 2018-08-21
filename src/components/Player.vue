<template>
    <div class="player">
        <div class="normal-player" v-show="fullScreen">
            <div class="normal-player-header"></div>
            <div class="normal-player-cd"></div>
            <div class="normal-player-option"></div>
            <div class="normal-player-progress"></div>
            <div class="normal-player-operation"></div>
        </div>
        <div class="mini-player" v-show="!fullScreen">
            <div class="player-pic"><img src="../assets/logo.png" alt=""></div>
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
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "player",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {
    ...mapGetters(["fullScreen"])
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.player {
  width: 100%;
  .normal-player {
    .normal-player-header {
    }
    .normal-player-cd {
    }
    .normal-player-option {
    }
    .normal-player-progress {
    }
    .normal-player-operation {
    }
  }
  .mini-player {
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
    .player-list,.player-play {
      color: #a9a2a2;
      font-size: 1.8rem;
         width: 12%;
    }
  }
}
</style>

