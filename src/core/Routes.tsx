import { MainLayout } from '@/layouts/MainLayout'
import { Route, Router } from '@solidjs/router'
import { LoginPage } from '@/pages/auth/Login'
import { RegisterPage } from '@/pages/auth/Register'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { GuestLayout } from '@/layouts/GuestLayout'
import { ProtectedLayout } from '@/layouts/ProtectedLayout'
import { HomePage } from '@/pages/Home'
import { lazy } from 'solid-js'

const dashboardRoutes = [
  {
    path: '/dashboard',
    component: lazy(() => import('@/pages/dashboard/Dashboard'))
  },
  {
    path: '/wallets',
    component: lazy(() => import('@/pages/dashboard/Wallets'))
  },
  {
    path: '/categories',
    component: lazy(() => import('@/pages/dashboard/Categories'))
  },
  {
    path: '/transactions',
    component: lazy(() => import('@/pages/dashboard/Transactions'))
  }
]

export const Routes = () => (
  <Router root={MainLayout}>
    <Route path="/" component={HomePage} />
    <Route component={GuestLayout}>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </Route>
    <Route component={ProtectedLayout}>
      <Route component={DashboardLayout}>
        {dashboardRoutes.map((route) => (
          <Route path={route.path} component={route.component} />
        ))}
      </Route>
    </Route>
  </Router>
)
