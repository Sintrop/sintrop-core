import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { HomePage } from './pages/HomePage/HomePage'
import { AppStorePage } from './pages/AppStorePage/AppStorePage'
import { AppDetailsPage } from './pages/AppDetailsPage/AppDetailsPage'
import { ImpactAppsPage } from './pages/ImpactAppsPage/ImpactAppsPage'
import { NetworkPage } from './pages/NetworkPage/NetworkPage'

export function AppRoutes(): React.JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/impact-apps" element={<ImpactAppsPage />} />
        <Route path="/app-store" element={<AppStorePage />} />
        <Route path="/app-details/:appId" element={<AppDetailsPage />} />
        <Route path="/network" element={<NetworkPage />} />
      </Routes>
    </Router>
  )
}
