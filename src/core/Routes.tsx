import { MainLayout } from '@/layouts/MainLayout'
import { Route, Router } from '@solidjs/router'
import { DashboardPage } from '@/pages/Dashboard'
import { LoginPage } from '@/pages/auth/Login'
import { RegisterPage } from '@/pages/auth/Register'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { GuestLayout } from '@/layouts/GuestLayout'

export const Routes = () => (
  <Router root={MainLayout}>
    <Route path={['/', '/dashboard']} component={DashboardLayout}>
      <Route path="/" component={DashboardPage} />
    </Route>
    <Route component={GuestLayout}>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </Route>
  </Router>
)
