import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage/HomePage'
import { AppStorePage } from './pages/AppStorePage/AppStorePage'
import { AppDetailsPage } from './pages/AppDetailsPage/AppDetailsPage'

export function AppRoutes(): React.JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app-store" element={<AppStorePage />} />
        <Route path="/app-details/:appId" element={<AppDetailsPage />} />
      </Routes>
    </Router>
  )
}
