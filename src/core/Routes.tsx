import { MainLayout } from '@/layouts/MainLayout'
import { Route, Router } from '@solidjs/router'
import { DashboardPage } from '@/pages/Dashboard'
import { LoginPage } from '@/pages/auth/Login'
import { RegisterPage } from '@/pages/auth/Register'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { GuestLayout } from '@/layouts/GuestLayout'
import { ProtectedLayout } from '@/layouts/ProtectedLayout'

export const Routes = () => (
  <Router root={MainLayout}>
    <Route component={GuestLayout}>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </Route>
    <Route component={ProtectedLayout}>
      <Route component={DashboardLayout}>
        <Route path={['/', '/dashboard']} component={DashboardPage} />
      </Route>
    </Route>
  </Router>
)
