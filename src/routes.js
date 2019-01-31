import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import SettingsPage from "./components/pages/SettingsPage";
import NotFoundPage from "./components/pages/NotFoundPage";

export default [
  {
    path: "/",
    component: HomePage
  },
  {
    path: "/about/",
    component: AboutPage
  },
  {
    path: "/settings/",
    component: SettingsPage
  },
  {
    path: "(.*)",
    component: NotFoundPage
  }
];
