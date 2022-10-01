import { ArrowForward, Build, Dashboard, Science } from "@mui/icons-material";
import { Card, CardContent, CardHeader } from "@mui/material";
import { map } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Test from "../pages/Test";

export const NavIcon = {
  BUILD: 'BUILD',
  DASHBOARD: 'DASHBOARD',
  SCIENCE: 'SCIENCE'
}

export const getNavIcon = key => {
  switch (key) {
    case NavIcon.BUILD: return <Build />
    case NavIcon.DASHBOARD: return <Dashboard />
    case NavIcon.SCIENCE: return <Science />
    default: return <ArrowForward />
  }
}

export const NavItem = {
  HOME: { to: '/', label: 'Home', element: <Home /> },
  TEST: { to: '/test', label: 'Test', element: <Test /> },
  NOT_FOUND: { to: '*', element: <NotFound /> }
}

export default function NavSection({ title, links }) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        { map(links, (link, i) => (
          <Link key={`${title}-link-${i}`} to={link.to} style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {getNavIcon(link.iconKey)}
              <span style={{ marginLeft: '.5rem' }}>{link.label}</span>
            </div>
          </Link>
        )) }
      </CardContent>
    </Card>
  )
}
