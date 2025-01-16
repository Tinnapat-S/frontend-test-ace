import { createRouter, createWebHistory } from "vue-router"
import RocketView from "@/views/RocketView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: RocketView,
    },
  ],
})

export default router
