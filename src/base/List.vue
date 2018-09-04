<template>
    <div class="list">

        <div class="list-item" v-for="(item,index) in list" :key="item.id" @click="selectItem(index,item)">
            <div class="item-num">{{index+1}}</div>
            <div class="item-content">
                <div class="item-content-name">{{item.name}}</div>
                <div class="item-content-artist">{{item.singer}}</div>
            </div>
            <div class="item-option">
                <slot></slot>
                <i class="fa fa-play-circle-o" style="font-size:1.5rem;"></i>
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
    }
  },
  methods:{
    selectItem(index,item){
        this.$emit('select',index,item)
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  background: #fff;
  border-radius: 5px;
  padding-top: 10px;
  .list-item {
    display: flex;
    padding-bottom: 0.5rem;
    border-bottom: solid 1px #ddd;
    .item-num {
      align-self: center;
      width:3%;
      padding-left: 0.5rem;
      padding-right: 1.5rem;
    }
    .item-content {
      display: flex;
      flex-direction: column;
      flex: 0.9;
      padding-top: 0.5rem;
      //   border-bottom: 1px solid #ddd;
      .item-content-name {
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

