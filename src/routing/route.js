import HomePage from "../pages/HomePage/HomePage";
import DetailFilmPage from "../pages/DetailFilmPage/DetailFilmPage";
import LogInPage from "../pages/LogInPage/LogInPage";
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";

const route = [
    {
        path: "/", 
        exact: true, 
        component: HomePage
    },

    {
        path: "/CheckOutPage", 
        exact: false, 
        component: CheckOutPage
    },

    {
        path: "/LogIn", 
        exact: false, 
        component: LogInPage
    },

    {
        path: "/aboutUs", 
        exact: false, 
        component: AboutUsPage
    },

    {
        path: "/:id", 
        exact: false, 
        component: DetailFilmPage
    },
]

export default route;