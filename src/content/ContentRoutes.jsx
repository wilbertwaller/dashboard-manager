import { map, values } from 'lodash'
import { useRoutes } from 'react-router-dom'
import { NavItem } from '../header/NavSection'

export default function ContentRoutes() {
  return useRoutes(
    map(values(NavItem), nav => ({ path: nav.to, element: nav.element }))
  )
}
