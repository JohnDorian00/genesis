<script setup>
import EntityDisplay from "./components/EntityDisplay.vue";
</script>

<template>
  <main>
    <EntityDisplay></EntityDisplay>
  </main>
</template>

<style scoped>
main {
  height: 100%;
  width: 80%;
}

/*4k*/
@media screen and (min-width: 1201px) {
}
/*PC*/
@media screen and (max-width: 1200px) {
}
/*Tablet*/
@media screen and (max-width: 768px) {
}
/*Phone*/
@media screen and (max-width: 480px) {
  main {
    width: 100%;
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>
