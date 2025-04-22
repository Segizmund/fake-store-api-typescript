import './index.css'
import {createRoot} from 'react-dom/client';
import Layout from './layout/Layout';
import App from './App.tsx'
import Login from "./auth/Login.tsx";
import Register from "./auth/Register.tsx";
import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const ProtectedRoute = () => {
    const isAuthenticated = !!sessionStorage.getItem('authToken');

    if (isAuthenticated) {
        return <Outlet />; // Отображаем дочерний элемент
    } else {
        return <Navigate to="/login" replace />; // Перенаправляем на страницу логина
    }
};

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <App/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {/*{
                path: "/profile",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "",
                        element: <Profile />,
                    },
                ],
            },*/}
        ]
    }
]);

const root = createRoot(document.getElementById('root'));
root.render(
    <>
        <RouterProvider router={router}/>
    </>
);
