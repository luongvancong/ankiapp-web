import DeskList from "./Screens/Desk/List";
import DeskDetail from "./Screens/Desk/Detail";
import DeskCard from "./Screens/Desk/Cards";
import DashBoard from "./Screens/DashBoard";
import Login from "./Screens/Login";


const routes = [
    {
        path: "/",
        exact: true,
        component: DashBoard
    },
    {
        path: "/login",
        name: "login",
        exact: true,
        component: Login
    },
    {
        path: "/desks",
        exact: true,
        component: DeskList,
        routes: [
            {
                path: "/:id",
                exact: true,
                component: DeskDetail
            },
            {
                path: "/:id/cards",
                exact: true,
                component: DeskCard
            },
        ]
    },

];

export default routes;