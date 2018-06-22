<template>
    <div class="sheet-label">
        {{title}}
        <i class="fa fa-angle-right"></i>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "",
      required: true,
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.sheet-label {
  text-align: left;
  padding-left: 6%;
  padding-top: 6%;
}
</style>

