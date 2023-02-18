<template>
  <div class="main">
    <div class="main__types-list"><Dropdown v-model:selected="entityType" :options="dropdownOptions"></Dropdown></div>
    <div class="main__save-button"><Button :isLoading="isLoading" :isDisable="entityType === 0" @click="addItem"></Button></div>
    <div class="main__entity-view">{{ items}}</div>
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
      isLoading: false,
      entityType: 0,
      dropdownOptions: ['Сделка','Контакт','Компания']
    }
  },
  mounted() {
      console.log(this.compStore.backendUrl)
  },
  methods: {
    addItem: async function () {
      if (this.dropdownOptions && this.dropdownOptions[this.entityType - 1]) {
        // this.isLoading = true;
        this.items.push({type: this.dropdownOptions[this.entityType - 1], id: 1})
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
    align-items: center;
    //justify-content: flex-end;
  }
}

.main__types-list {
  justify-content: flex-end;
}
.main__save-button {
  //justify-content: flex-start;
  margin-left: 10px;
}
.main__entity-view {
  grid-area: 2 / 1 / 3 / 3 ;
  background-color: red;
}
</style>