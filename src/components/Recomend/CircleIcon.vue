<template>
    <div class="wrapper"> 
        <div class="circle">
            <i :class="icon"></i>

        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.circle {
  display: inline-block;
  width: 26px;
  // border:solid 1px;
  //border-radius: 50%;
  border-radius: 50%;
  padding: 20%;
  background: #94c540ed;
}

.wrapper{
   width: 20%;
    display: inline-block;
}
</style>

