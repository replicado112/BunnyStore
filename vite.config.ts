import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Base configurável: VITE_BASE=/nome-do-repo/ npm run build (padrão './' funciona com HashRouter)
export default defineConfig({ plugins: [react()], base: process.env.VITE_BASE ?? './' })
