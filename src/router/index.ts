import { createRouter, createWebHashHistory } from "vue-router";
import FeaturePcking from "@/components/FeaturePcking/FeaturePcking.vue";
import main from "@/components/main/main.vue";
import Glb from "@/components/0509GLB/index.vue";
import GlbColor from "@/components/0510GLBColor/index.vue";
import TilesHeight from "@/components/05103DtilesHeight/index.vue";
import EntityE from "@/components/0131Entity/index.vue";

const routes = [
  // { path: "/", component: main },
  { path: "/main", component: main },
  { path: "/test", component: FeaturePcking },
  { path: "/glb", component: Glb },
  { path: "/glbColor", component: GlbColor },
  { path: "/tilesHeight", component: TilesHeight },
  { path: "/entityE", component: EntityE },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export { router };
