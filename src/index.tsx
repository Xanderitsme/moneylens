/* @refresh reload */
import { render } from 'solid-js/web'
import App from '@/core/App'
import '@/ui/index.css'

const root = document.getElementById('root')

render(() => <App />, root!)
