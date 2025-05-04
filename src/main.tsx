import './index.css'
import {createRoot} from 'react-dom/client';
import Layout from './layout/Layout';
import App from './App.tsx'
import Login from "./auth/Login.tsx";
import React from "react";
import { useAuth } from './auth/AuthContext';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { AuthProvider } from './auth/AuthContext';

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuth();
    if (isLoggedIn) {
        return children;
    } else {
        return <Navigate to="/login" replace />;
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
    <AuthProvider>
        <RouterProvider router={router}/>
    </AuthProvider>
);
