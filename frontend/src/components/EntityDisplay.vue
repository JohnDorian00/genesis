<template>
  <div class="main">
    {{ compStore.backendUrl }}
  <button style="width: 200px; height: 50px" @click="addItem({type: 1, id: 1})"></button>
  </div>
</template>



<script>
import {useItemsStore} from "../stores/items";

export default {
  name: "EntityDisplay",
  data() {
    return {
      items: [],
      compStore: useItemsStore()
    }
  },
  mounted() {
      console.log(this.compStore.backendUrl)
  },
  methods: {
    addItem: function (item) {
      if (item && item.type && item.id) {
        this.items.push(item)
      }
    }
  }
}
</script>

<style scoped>
.main {
  /*background-color: greenyellow;*/
  width: 100%;
  height: 100%;
}
</style>