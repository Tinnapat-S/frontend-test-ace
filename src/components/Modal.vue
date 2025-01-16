<script setup lang="ts">
import { defineProps, defineEmits } from "vue"
defineProps({
  isModalVisible: {
    type: Boolean,
    required: true,
  },
  rocket: {
    type: Object,
    default: null,
  },
})
const emit = defineEmits(["close"])
</script>
<!-- ตารางและเพมเตมเชน รายละเอยด(details) ขอมลจรวด(rocket)
นกบน(crew) ฐานทยง(launchpad) -->
<template>
  <div v-if="isModalVisible" class="modal" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="flex-self-center">
        <img
          :src="rocket.links.patch.large"
          :alt="rocket.id"
          class="p-4"
          height="100"
          width="100"
        />
      </div>
      <p>Rocket ID: {{ rocket.id }}</p>
      <p>Rocket Name: {{ rocket.name }}</p>
      <p>Launch Pad: {{ rocket.launchpad }}</p>
      <p>Flight Number: {{ rocket.flight_number }}</p>
      <p>Failures Time: {{ rocket.failures[0]?.time }}</p>
      <button class="close-btn" @click="$emit('close')">x</button>
    </div>
  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  max-width: 80%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}
.flex-self-center {
  justify-self: center;
}
.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin: 10px;
  border-radius: 50px;
  border: 0;
  cursor: pointer;
}
</style>
