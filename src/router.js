import { createWebHistory, createRouter } from "vue-router";
import ViewTickets from './components/MainContent/ViewTickets.vue';
import HomePage from './components/MainContent/HomePage.vue';
import DepartmentPage from './components/MainContent/DepartmentPage.vue';
//import AddForm from './components/inside-content/AddForm.vue';

const routes = [
    {
        path:"/",
        name:"Home",
        component: HomePage
    },
    {
        path:"/viewtickets",
        name:"ViewTickets",
        component: ViewTickets
    },
    {
        path:"/department",
        name:"Department",
        component: DepartmentPage
    },
    /*
    {
        path:"/AddTicket",
        name:"AddTicket",
        component: AddForm
    }
    */
];

const router = createRouter({
    history:createWebHistory(),
    routes,
});

export default router;