import './index.css'
import {createRoot} from 'react-dom/client';
import Layout from './layout/Layout';
import App from './App.tsx'
import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <App/>,
            },
        ]
    }
]);

const root = createRoot(document.getElementById('root'));
root.render(
    <>
        <RouterProvider router={router}/>
    </>
);
