import React from 'react'
import Notification from '../components/Notification'
import ContentRoutes from './ContentRoutes'

export default function Content() {
  return (<>
    <div className='app-content'>
      <ContentRoutes />
    </div>
    <Notification />
  </>)
}
