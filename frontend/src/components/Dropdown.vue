<template>
<!--  <select data-menu-->
<!--      type="text"-->
<!--      :value="selected"-->
<!--      @input="$emit('update:selected', $event.target.value)">-->
<!--    <option :value="-1">Не выбрано</option>-->
<!--    <option v-for="(option, index) in options" :value="index" :key="index">{{option}}</option>-->
<!--  </select>-->
    <a-select
        ref="select"
        v-model:value="selectLocal"
        style="width: 320px"
        :options="optionsLocal"
        @focus="focus"
        @change="handleInput"
    >
    </a-select>
</template>

<script>
import {ref} from "vue";

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
  data() {
    return {
      optionsLocal: [
        {
          value: 0,
          label: 'Не выбрано',
        },
      ],
      selectLocal: this.selected
    }
  },
  beforeMount() {
    try {
      this.options.forEach((item, index)=>{ this.optionsLocal.push({value: index + 1, label: item}) })
    } catch (e) {

    }
  },
  mounted() {
  },
  methods: {
    handleInput (value) {
      console.log(value)
      this.$emit('update:selected', value)
    }
  },
}
</script>

<style scoped lang="scss">
</style>