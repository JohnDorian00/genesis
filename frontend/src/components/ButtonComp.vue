<template>
  <a-button
    class="button"
    type="primary"
    :loading="isLoading"
    :disabled="isDisable"
    size="large"
    >Создать</a-button
  >
</template>

<script>
export default {
  name: "ButtonComp",
  props: {
    isLoading: Boolean,
    isDisable: Boolean,
  },
  mounted() {},
};
</script>

<style scoped></style>
