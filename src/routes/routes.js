import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import ClassGenerator from "@/pages/ClassGenerator.vue";
import UserProfile from "@/pages/UserProfile.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "class-generator",
        name: "Class generator",
        component: ClassGenerator,
      },
      {
        path: "user",
        name: "User",
        component: UserProfile,
      }
    ],
  },
];

export default routes;
