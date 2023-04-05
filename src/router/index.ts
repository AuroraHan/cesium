import { createRouter, createWebHashHistory } from "vue-router";
import FeaturePcking from "@/components/FeaturePcking/FeaturePcking.vue";
import main from "@/components/main/main.vue";

const routes = [
  //   { path: '/', component: Test },
  { path: "/main", component: main },
  { path: "/test", component: FeaturePcking },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router };
