import { MainLayout } from '@/layouts/MainLayout'
import { Route, Router } from '@solidjs/router'
import { DashboardPage } from '@/pages/dashboard/Dashboard'
import { LoginPage } from '@/pages/auth/Login'
import { RegisterPage } from '@/pages/auth/Register'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { GuestLayout } from '@/layouts/GuestLayout'
import { ProtectedLayout } from '@/layouts/ProtectedLayout'
import { HomePage } from '@/pages/Home'
import { WalletsPage } from '@/pages/dashboard/Wallets'
import { CategoriesPage } from '@/pages/dashboard/Categories'
import { TransactionsPage } from '@/pages/dashboard/Transactions'

export const Routes = () => (
  <Router root={MainLayout}>
    <Route path="/" component={HomePage} />
    <Route component={GuestLayout}>
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
    </Route>
    <Route component={ProtectedLayout}>
      <Route component={DashboardLayout}>
        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/wallets" component={WalletsPage} />
        <Route path="/categories" component={CategoriesPage} />
        <Route path="/transactions" component={TransactionsPage} />
      </Route>
    </Route>
  </Router>
)
