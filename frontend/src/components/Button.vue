<template>
  <button class="button"></button>
</template>

<script>
export default {
  name: "Button",
  props: {
    isLoad: Boolean,
    isBlock: Boolean
  }
}
</script>

<style scoped>
.button {
  width: 100px;
  height: 50px;
}
</style>