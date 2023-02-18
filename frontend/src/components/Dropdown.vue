<template>
<!--  <select data-menu-->
<!--      type="text"-->
<!--      :value="selected"-->
<!--      @input="$emit('update:selected', $event.target.value)">-->
<!--    <option :value="-1">Не выбрано</option>-->
<!--    <option v-for="(option, index) in options" :value="index" :key="index">{{option}}</option>-->
<!--  </select>-->
</template>

<script>
export default {
  name: "Dropdown",
  props: {
    selected: {
      type: Number,
      required: true
    },
    options: {
      type: Array
    }
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
</style>