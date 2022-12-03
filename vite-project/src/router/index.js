import { createRouter, createWebHashHistory } from "vue-router";
import HellowWorld from "../view/HelloWorld.vue";
import ChatRoom from "../view/ChatRoom.vue";

const routes = [
  {
    path: "/",
    component: HellowWorld,
  },
  {
    path: "/about",
    component: () => import("../view/AboutView.vue"),
  },
  {
    path: "/user/:id",
    component: () => import("../view/UserPage.vue"),
  },
  {
    path: "/chat",
    component: ChatRoom,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
