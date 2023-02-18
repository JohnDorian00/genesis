<template>
  <div class="main">
    <div class="main__types-list"><Dropdown v-model:selected="entityType" :options="dropdownOptions"></Dropdown></div>
    <div class="main__save-button"><Button @click="addItem({type: 1, id: 1})"></Button></div>
    <div class="main__entity-view">{{entityType}}</div>
  </div>
</template>



<script>
import {useItemsStore} from "../stores/items";
import Button from "./Button.vue";
import Dropdown from "./Dropdown.vue";

export default {
  name: "EntityDisplay",
  components: {Dropdown, Button},
  data() {
    return {
      items: [],
      compStore: useItemsStore(),
      isLoading: true,
      entityType: 0,
      dropdownOptions: ['Сделка','Контакт','Компания']
    }
  },
  mounted() {
      console.log(this.compStore.backendUrl)
  },
  methods: {
    addItem: async function (item) {
      if (item && item.type && item.id && this.dropdownOptions && this.dropdownOptions[this.entityType]) {
        this.isLoading = true;
        console.log(this.compStore.createLinks[this.entityType])


        this.items.push({type: this.dropdownOptions[this.entityType], id: item.id})
      }
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  /*background-color: greenyellow;*/
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-rows: 20% 1fr;
  grid-template-columns: 1fr 1fr;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.main__types-list {

}
.main__save-button {

}
.main__entity-view {
  grid-area: 2 / 1 / 3 / 3 ;
  background-color: red;
}
</style>