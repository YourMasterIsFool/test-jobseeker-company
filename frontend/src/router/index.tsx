import App from "@/App";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";


const LazyApplicantPage =  lazy(() => import('../pages/applicant/index'));
const LazyCandidatePage = lazy(() => import("../pages/candidate/index"));
const LazyVacancyPage = lazy(() => import("../pages/vacancy/index"));


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        Component: LazyApplicantPage,
      },

      {
        path: "/candidate",
        Component: LazyCandidatePage,
      },

      {
        path: "/vacancy",
        Component: LazyVacancyPage,
      },
    ],
  },
]);

export default router;