import { createWebHistory, createWebHashHistory, createRouter } from "vue-router";
const Home = () => import("./components/Home.vue");
const Login = () => import("./components/Login.vue");
const Register = () => import("./components/Register.vue");
const Landing = () => import("./components/Landing.vue");
const Profile = () => import("./components/Profile.vue");
const routes = [
    {
        path: "/",
        component: Landing,
    },
    {
        path: "/landing",
        component: Landing,
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
        path: "/home",
        component: Home,
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
