import About from "./components/About";
import AppLayout from "./components/AppLayout";
import Home from "./components/Home";
import {  createBrowserRouter } from "react-router"
import Recipes from "./components/Recipes";

export const router = createBrowserRouter([
    {
        path: '/', element: <AppLayout />,
        errorElement: <h1>Error. Please try later...</h1>,
        children: [
            { path: '/', element: <Home /> },
            { path: '/about', element: <About /> },
            { path: '/recipes', element: <Recipes /> }

        ]
    }
 
])