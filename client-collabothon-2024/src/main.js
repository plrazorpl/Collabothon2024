import "./init.js";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "widget",
        component: () => import("./views/WidgetFull.vue"),
    },
    {
        path: "/widget",
        name: "widget-small",
        component: () => import("./views/WidgetPreview.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);

app.use(router);
app.mount("#app");
