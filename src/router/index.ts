import { createRouter, createWebHashHistory } from "vue-router";
import FeaturePcking from "@/components/FeaturePcking/FeaturePcking.vue";
import main from "@/components/main/main.vue";
import Glb from "@/components/0509GLB/index.vue";

const routes = [
  //   { path: '/', component: Test },
  { path: "/main", component: main },
  { path: "/test", component: FeaturePcking },
  { path: "/glb", component: Glb },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router };
