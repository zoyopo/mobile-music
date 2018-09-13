<template>

  <div class="skeleton page">
    <div class="skeleton-nav" v-if="navShow"></div>
    <div class="skeleton-swiper"></div>
    <ul class="skeleton-tabs">
      <li v-for="i in itemNum" class="skeleton-tabs-item" :key="i" v-if="itemShow"><span></span></li>
    </ul>
    <div class="skeleton-banner"></div>
    <div v-for="i in 6" class="skeleton-productions" :key="i"></div>
  </div>
</template>
<script>
export default {
    name:'skeleton',
    props:{
      itemNum:{
        type:Number,
        default:8
      },
      productionNum:{
        type:Number,
        default:6
      },
      navShow:{
        type:Boolean,
        default:true
      },
      itemShow:{
        type:Boolean,
        default:true
      }
    }
}
</script>
<style scoped>
.skeleton {
  position: relative;
  height: 100%;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;
  background: #fff;
}
.skeleton-nav {
  height: 45px;
  background: #eee;
  margin-bottom: 15px;
}
.skeleton-swiper {
  height: 160px;
  background: #eee;
  margin-bottom: 15px;
}
.skeleton-tabs {
  list-style: none;
  padding: 0;
  margin: 0 -15px;
  display: flex;
  flex-wrap: wrap;
}
.skeleton-tabs-item {
  width: 25%;
  height: 55px;
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 15px;
}
.skeleton-tabs-item span {
  display: inline-block;
  width: 55px;
  height: 55px;
  border-radius: 55px;
  background: #eee;
}
.skeleton-banner {
  height: 60px;
  background: #eee;
  margin-bottom: 15px;
}
.skeleton-productions {
  height: 20px;
  margin-bottom: 15px;
  background: #eee;
}
</style>




