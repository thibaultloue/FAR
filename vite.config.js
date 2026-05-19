import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Custom domain (far.thibaultloue.com) = base at root. Subpath github.io/FAR needs /FAR/.
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const basePath =
  process.env.VITE_BASE_PATH != null && process.env.VITE_BASE_PATH !== ''
    ? process.env.VITE_BASE_PATH
    : process.env.GITHUB_ACTIONS === 'true' && repositoryName
      ? `/${repositoryName}/`
      : '/'

export default defineConfig({
  plugins: [react()],
  base: basePath,
})
