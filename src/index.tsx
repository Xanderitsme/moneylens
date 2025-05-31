/* @refresh reload */
import { render } from 'solid-js/web'
import '@fontsource-variable/inter';
import '@/core/ui/index.css'
import { Routes } from '@/core/Routes'

const root = document.getElementById('root')

render(Routes, root!)
