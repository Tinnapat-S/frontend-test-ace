<script setup lang="ts">
import { ref, watch, type PropType } from "vue"
import dayjs from "dayjs"
interface ITable {
  id: string
  name: string
  static_fire_date_utc: string | null
  links: {
    patch: { large: string }
  }
  crew: string[]
}
//check my type
const props = defineProps({
  initialData: {
    type: Array as PropType<ITable[]>,
    default: () => [],
    required: true,
  },
})
const emit = defineEmits(["rocket-click"])
const localItems = ref(props.initialData)
watch(
  () => props.initialData,
  (newValue) => (localItems.value = newValue)
)
const filters = ["ALL", "PAST", "UPCOMING"]
const TODAY = "2010-03-13 07:00 AM"
const handleClickFilter = (filter: string) => {
  switch (filter) {
    case "PAST":
      localItems.value = props?.initialData?.filter((rocket) =>
        dayjs(rocket.static_fire_date_utc).isBefore(dayjs())
      )
      break
    case "UPCOMING":
      localItems.value = props?.initialData?.filter((rocket) =>
        dayjs(rocket.static_fire_date_utc).isAfter(dayjs(TODAY))
      )
      break
    default:
      localItems.value = props.initialData
      break
  }
}
const handleRocketClick = (targetRocket: any) => {
  emit("rocket-click", targetRocket)
}
</script>
<template>
  <div class="text-center p-4">
    <h1>Today is {{ TODAY }}</h1>
  </div>
  <div class="filter-area">
    <button
      v-for="filter in filters"
      class="custom-button"
      :key="filter"
      @click="handleClickFilter(filter)"
    >
      {{ filter }}
    </button>
  </div>
  <table class="my-table">
    <thead class="table-header">
      <tr>
        <th>Name</th>
        <th>DUE AT</th>
        <th>Image</th>
        <th>Crew (count)</th>
      </tr>
    </thead>
    <tr
      v-for="item in localItems"
      :key="item.id"
      class="table-row"
      @click="handleRocketClick(item)"
    >
      <td class="p-4">{{ `${item.name}` }}</td>
      <td class="text-center">
        {{
          item.static_fire_date_utc
            ? dayjs(item.static_fire_date_utc).format("YYYY-MM-DD HH:mm A")
            : "-"
        }}
      </td>
      <td class="table-image">
        <div class="table-image">
          <img
            :src="item.links.patch.large"
            :alt="item.id"
            class="p-4"
            height="150"
            width="150"
          />
        </div>
      </td>
      <td class="text-center">{{ item.crew.length }}</td>
    </tr>
  </table>
</template>

<style scoped>
.custom-button:hover {
  cursor: pointer;
  background-color: skyblue;
  color: white;
}
.custom-button {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  background-color: lightblue;
}
.filter-area {
  display: flex;
  justify-content: space-around;
  padding-bottom: 16px;
}
.table-header {
  background-color: rgb(255, 246, 212);
}
.table-row {
  background-color: rgb(255, 253, 246);
}
.table-row:hover {
  background-color: cornsilk;
  cursor: pointer;
}
.my-table {
  width: 100%;
}
.p-4 {
  padding: 16px;
}
.table-image {
  width: 150px;
  height: 150px;
}
.text-center {
  text-align: center;
}
</style>
