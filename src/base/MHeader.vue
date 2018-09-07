<template>
    <div class='header'>
        <div class="header-arrow">
            <img @click="back" id="header-arrow-arrow" src="../assets/songsheet/arrow-left.png" alt="暂无">
        </div>
        <div class="header-title">
            <div class="header-title-title">{{info.title}}</div>
            <div v-if="info.description" class="header-title-description">{{info.description}}</div>
        </div>
        <!-- <div class="header-search"><img id='header-search-icon' src="../assets/songsheet/search-sm.png" alt="暂无"></div>
        <div class="header-share"><img id="header-share-icon" src="../assets/songsheet/Option.png" alt="暂无"></div> -->
    </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods:{
      back(){
          this.$emit('back');
      }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background: #ddd;
  color: #fff;
  display: flex;

  .header-arrow {
    // align-self: flex-end;
    flex: 0.2;
    align-self: center;
    #header-arrow-arrow {
      width: 60%;
      display: block;
    }
  }
  .header-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 0.7;
    width: 50%;
    .header-title-title {
      // height: 20px;
      font-size: 1.2rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
    }
    .header-title-description {
      font-size: 0.5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
    }
  }
  .header-search {
    flex: 0.2;
    align-self: center;
    #header-search-icon {
      width: 45%;
    }
  }
  .header-share {
    flex: 0.2;
    align-self: center;
    #header-share-icon {
      width: 50%;
    }
  }
}
</style>

