import { createWebHistory, createRouter } from "vue-router";
const Home = () => import("./components/Home.vue");
const Login = () => import("./components/Login.vue");
const Register = () => import("./components/Register.vue");
const Creets = () => import("./components/Creets.vue");
const Profile = () => import("./components/Profile.vue");
const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/profile",
        component: Profile,
    },
    {
        path: "/creets",
        component: Creets,
    },
    {
        path: "/register",
        component: Register,
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
