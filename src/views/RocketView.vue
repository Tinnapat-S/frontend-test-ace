<script setup lang="ts">
import RocketTable from "@/components/RocketTable.vue"
import Modal from "@/components/Modal.vue"
import axios from "axios"
import { onMounted, ref } from "vue"

const launchesData = ref([])
const initialLaunchesData = ref([])
const isModalVisible = ref(false)
const selectedRocket = ref<any>(null)

onMounted(async () => {
  try {
    const response = await axios.get("https://api.spacexdata.com/v4/launches")
    launchesData.value = response.data
    initialLaunchesData.value = response.data
  } catch (err) {}
})

const handleRocketClick = (rocket: string) => {
  selectedRocket.value = rocket // Store the fetched data
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
}
</script>

<template>
  <main>
    <div class="wrapper">
      <RocketTable
        :initialData="launchesData"
        @rocket-click="handleRocketClick"
      />
      <Modal
        :isModalVisible="isModalVisible"
        :rocket="selectedRocket"
        @close="closeModal"
      />
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
}
</style>
