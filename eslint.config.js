import { defineConfig } from '@configurajs/eslint'

export default defineConfig({
  ignores: ['typed-router.d.ts','./backend/**','./src/assets/anim/*', './backend/public/**', './src/gen/**', './public/**','./backend/src/modules/pragmatic/v2/models/**', './backend/src/modules/pragmatic/v2/games/**'],
  rules: {
    'prettier/prettier': 'off',
    'curly': 'warn',
  },
})
