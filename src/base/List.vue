<template>
  <div class="list">

    <div class="list-item" v-for="(item,index) in list" :key="item.id" @click="selectItem(index,item)">
      <div class="item-num">{{index+1}}</div>
      <div v-if="showPic" class="item-img"><img class="item-img-img" v-lazy="item.album.blurPicUrl" alt=""></div>
      <div class="item-content">
        <div class="item-content-name">{{item.name}}
          <slot v-bind:item="item"></slot>
        </div>
        <div class="item-content-artist">{{item.singer}}</div>
      </div>
      <div class="item-option">
        <slot></slot>
        <i class="fa fa-play-circle-o" style="font-size:1.5rem;color:rgba(197, 199, 17, 0.44);"></i>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "list",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    showPic: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectItem(index, item) {
      this.$emit("select", index, item);
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  background: #fff;
  border-radius: 15px;
  padding-top: 10px;
  .list-item {
    display: flex;
    padding-bottom: 0.5rem;
    border-bottom: solid 1px #ddd;
    padding-top: 0.5rem;
    .item-num {
      align-self: center;
      width: 3%;
      padding-left: 0.5rem;
      padding-right: 1.5rem;
    }
    .item-img {
      width: 10%;
      align-self: center;
      padding-right: 0.5rem;
      .item-img-img {
        width: 100%;
        display: block;
      }
    }
    .item-content {
      display: flex;
      flex-direction: column;
      flex: 0.9;
      width: 65%;
      //padding-top: 0.5rem;
      //   border-bottom: 1px solid #ddd;
      .item-content-name {
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 95%;
        overflow: hidden;
      }
      .item-content-artist {
        font-size: 0.5rem;
      }
    }
    .item-option {
      align-self: center;
    }
  }
}
</style>

