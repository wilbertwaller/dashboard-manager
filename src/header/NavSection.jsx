import React from "react"
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

export const NavItem = {
  HOME: { to: '/', label: 'Home', element: <Home /> },
  NOT_FOUND: { to: '*', element: <NotFound /> }
}