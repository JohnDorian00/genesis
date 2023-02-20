<template>
  <div class="entity-view">
    <a-list
      size="middle"
      bordered
      item-layout="horizontal"
      :data-source="data"
      :pagination="{ pageSize: 8 }"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta>
            <template #title>
              {{ item.title }}
            </template>
            <template #description>
              {{ "id -> " + item.id }}
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
export default {
  name: "EntityView",
  props: {
    data: {
      type: Array,
      require: true,
    },
  },
};
</script>

<style scoped>
.entity-view {
  width: 100%;
}
</style>
