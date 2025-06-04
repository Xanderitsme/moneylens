/* @refresh reload */
import { render } from 'solid-js/web'
import { Routes } from '@/core/Routes'
import '@fontsource-variable/inter';
import '@/styles/index.css'

const root = document.getElementById('root')

render(Routes, root!)
