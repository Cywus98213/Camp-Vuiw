import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CampsView from "../views/CampgroundsView.vue";
import CampView from "../views/CampgroundDetailView.vue";
import CampEditView from "../views/CampEditView.vue";
import CreateCamptView from "../views/CreateCamptView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/campgrounds",
      name: "campgrounds",
      component: CampsView,
    },
    {
      path: "/campgrounds/:id",
      name: "campground",
      component: CampView,
    },
    {
      path: "/campgrounds/:id",
      name: "campEdit",
      component: CampEditView,
    },
    {
      path: "/campgrounds/create",
      name: "createCamp",
      component: CreateCamptView,
    },
  ],
});

export default router;
