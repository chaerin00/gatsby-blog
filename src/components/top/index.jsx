import React from 'react'
import { Link } from 'gatsby'
import Sidebar from '../sidebar'

import './index.scss'

export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    <div className="top">
      {!isRoot && (
        <Link to={`/`} className="link" style={{ float: 'left' }}>
          {title}
        </Link>
      )}
      <Sidebar />
    </div>
  )
}
