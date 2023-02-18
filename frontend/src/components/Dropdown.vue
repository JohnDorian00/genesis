<template>
    <a-select
        class="dropdown"
        size="large"
        v-model:value="selectLocal"
        :options="optionsLocal"
        @focus="focus"
        @change="handleInput"
    >
    </a-select>
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
  methods: {
    handleInput (value) {
      this.$emit('update:selected', value)
    }
  },
}
</script>

<style scoped lang="scss">
.dropdown {
  width: 300px;
}
</style>