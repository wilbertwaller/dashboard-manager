import { Masonry } from '@mui/lab'
import { map } from 'lodash'
import React from 'react'
import NavSection, { NavIcon } from '../components/NavSection'

export default function Home() {
  const home = [
    {
      title: 'Admin',
      links: [
        { to: '/dashboard-manager', label: 'Dashboard Manager', iconKey: NavIcon.BUILD },
        { to: '/test', label: 'Test', iconKey: NavIcon.SCIENCE },
      ]
    },
  ]
  return (
    <Masonry columns={4} spacing={2}>
      { map(home, section => (
        <NavSection
          key={`section-${section.title}`}
          title={section.title}
          links={section.links}
        />
      )) }
    </Masonry>
  )
}
