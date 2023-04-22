import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CampsView from "../views/CampgroundsView.vue";
import CampView from "../views/CampgroundDetailView.vue";
import CampEditView from "../views/CampEditView.vue";
import CreateCamptView from "../views/CreateCamptView.vue";
import Error404View from "../views/404ErrorView.vue";
import Error400View from "../views/400ErrorView.vue";
import Error500View from "../views/500ErrorView.vue";
import RegisterView from "../views/UserRegister.vue";
import LoginView from "../views/UserLogin.vue";

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
    {
      path: "/campgrounds/error400",
      name: "Error400",
      component: Error400View,
    },
    {
      path: "/campgrounds/error404",
      name: "Error404",
      component: Error404View,
    },
    {
      path: "/campgrounds/error500",
      name: "Error500",
      component: Error500View,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

export default router;
