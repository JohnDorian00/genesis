<template>
  <a-select
    class="dropdown"
    size="large"
    v-model:value="selectLocal"
    :options="optionsWithNoChoice"
    @change="handleInput"
    :disabled="isDisable"
  >
  </a-select>
</template>

<script>
export default {
  name: "DropdownComp",
  props: {
    selected: {
      type: Number,
      required: true,
    },
    options: {
      type: Array,
    },
    isDisable: {
      type: Boolean,
    },
  },
  data() {
    return {
      selectLocal: this.selected,
    };
  },
  computed: {
    optionsWithNoChoice() {
      let options = [
        {
          value: 0,
          label: "Не выбрано",
        },
      ];

      if (Array.isArray(this.options)) {
        this.options.forEach((item, index) => {
          options.push({ value: index + 1, label: item });
        });
      }

      return options;
    },
  },
  methods: {
    handleInput(value) {
      this.$emit("update:selected", value);
    },
  },
};
</script>

<style scoped lang="scss">
.dropdown {
  width: 300px;
}
</style>
