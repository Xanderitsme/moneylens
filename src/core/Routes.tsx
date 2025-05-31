import { MainLayout } from '@/layouts/MainLayout'
import { Route, Router } from '@solidjs/router'
import { DashboardPage } from '@/pages/Dashboard'
import { LoginPage } from '@/pages/Login'
import { DashboardLayout } from '@/layouts/DashboardLayout'

export const Routes = () => (
  <Router root={MainLayout}>
    <Route path={['/', '/dashboard']} component={DashboardLayout}>
      <Route path="/" component={DashboardPage} />
    </Route>
    <Route path="/login" component={LoginPage} />
  </Router>
)
