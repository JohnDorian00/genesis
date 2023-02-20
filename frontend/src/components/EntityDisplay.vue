<template>
  <div class="main">
    <div class="main__types-list">
      <DropdownComp
        :isDisable="isDisable"
        v-model:selected="entityType"
        :options="dropdownOptions"
      ></DropdownComp>
    </div>
    <div class="main__save-button">
      <ButtonComp
        :isLoading="isLoading"
        :isDisable="entityType === 0"
        @click="addItem"
      ></ButtonComp>
    </div>
    <div class="main__entity-view"><EntityView :data="items"></EntityView></div>
  </div>
</template>

<script>
import { useItemsStore } from "../stores/items";
import axios from "axios";
import { message } from "ant-design-vue";

import ButtonComp from "./ButtonComp.vue";
import DropdownComp from "./DropdownComp.vue";
import EntityView from "./EntityView.vue";

const error500 = "Ошибка подключения к серверу";

export default {
  name: "EntityDisplay",
  components: { DropdownComp, ButtonComp, EntityView },
  data() {
    return {
      items: [],
      compStore: useItemsStore(),
      isLoading: false,
      isDisable: true,
      entityType: 0,
      dropdownOptions: ["Сделка", "Контакт", "Компания"],
    };
  },
  mounted() {
    this.health_check(
      this.compStore.backendAddress + this.compStore.links.linkHealthCheck
    );
  },
  methods: {
    addItem: async function () {
      if (this.dropdownOptions && this.dropdownOptions[this.entityType - 1]) {
        this.isLoading = true;

        try {
          let response = await axios.post(
            this.compStore.backendAddress +
              this.compStore.createLinks[this.entityType - 1]
          );
          if (!response.data || !response.data.id) {
            message.error(error500);
          } else {
            this.items.unshift({
              title: this.dropdownOptions[this.entityType - 1],
              id: response.data.id,
            });
          }
        } catch (error) {
          console.error(Object.keys(error), error.message);
        } finally {
          this.isLoading = false;
        }
      }
    },
    health_check: async function (url, timeReloadSec = 15) {
      try {
        let response = await axios.get(url);
        if (!response.data || !response.data.status) {
          message.error(error500);
          setTimeout(() => {
            this.health_check(url, timeReloadSec);
          }, timeReloadSec * 1000);
        } else {
          this.isDisable = false;
        }
      } catch (error) {
        console.warn(Object.keys(error), error);
        message.error(error500);
        setTimeout(() => {
          this.health_check(url, timeReloadSec);
        }, timeReloadSec * 1000);
      }
    },
  },
};
</script>

<style scoped lang="scss">
$border: none;
.main {
  /*background-color: greenyellow;*/
  width: 100%;
  height: 80%;

  display: grid;
  grid-template-rows: 20% 1fr;
  grid-template-columns: 1fr 1fr;

  & > div {
    display: flex;
  }
}

.main__types-list {
  justify-content: flex-end;
  align-items: center;
  border-bottom: $border;
}
.main__save-button {
  padding-left: 10px;
  align-items: center;
  border-bottom: $border;
}
.main__entity-view {
  grid-area: 2 / 1 / 3 / 3;
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
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;

    justify-content: flex-end;

    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .main__entity-view {
    order: 0;
  }

  .main__types-list {
    order: 1;
    margin-top: 70px;
  }

  .main__save-button {
    order: 2;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
