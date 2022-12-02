import { createRouter, createWebHashHistory } from "vue-router";
import HellowWorld from "../components/HelloWorld.vue";

const routes = [
  {
    path: "/",
    component: HellowWorld,
  },
  {
    path: "/about",
    component: () => import("../components/AboutView.vue"),
  },
  {
    path: "/user/:id",
    component: () => import("../components/UserPage.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
