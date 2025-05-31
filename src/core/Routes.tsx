import { MainLayout } from '@/layouts/MainLayout'
import { Route, Router } from '@solidjs/router'
import App from '@/core/App'

export const Routes = () => (
  <Router root={MainLayout}>
    <Route path="/" component={App} />
    <Route path="/dashboard" component={App} />
    <Route path="/login" component={App} />
  </Router>
)
