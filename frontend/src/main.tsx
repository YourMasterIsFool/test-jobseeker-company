// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {  RouterProvider } from "react-router";
import App from './App.tsx'
import router from '@/router/index.tsx';

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
