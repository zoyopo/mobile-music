<template>
    <transition name="loading">
        <div class="loading-wrapper" style="text-align:center;" v-show="!requestEnd">
            <div class="loading">
                <span class="loading-text">加载中&nbsp;&nbsp;</span>
                <inline-loading></inline-loading>
            </div>
        </div>
    </transition>
</template>

<script>
import { InlineLoading } from "vux";
import { mapGetters } from "vuex";
export default {
  components: {
    InlineLoading
  },
  computed: {
    ...mapGetters(["requestEnd"])
  }
};
</script>
<style lang="scss" scoped>
.loading-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  bottom: 0;
  background: #706f6f;
  opacity: 0.4;
  z-index: 9999;
  .loading {
    position: absolute;
    left: 40%;
    top: 50%;
    color: #000000;
    .loading-text {
      vertical-align: middle;
      display: inline-block;
      font-size: 14px;
    }
  }
  &.loading-enter-active,
  &.loading-leave-active {
    transition: all 0.5s;
  }
  &.loading-enter,
  &.loading-leave-to {
    opacity: 0;

    transform: translateX(100%)
  }

  &.loading-enter-to,
  &.loading-leave {
    opacity: 0.8;
  }
}
</style>

