# GEMINI.md - Codebase Guidelines

## Commands
- `bun dev` - Run both frontend and backend in development
- `bun dev:frontend` - Run frontend only
- `bun dev:backend` - Run backend only
- `bun test` - Run unit tests
- `bun test:coverage` - Run tests with coverage
- `bun test:e2e` - Run end-to-end tests
- `bun type-check` - Type check frontend
- `bun lint` - Lint and fix code
- `bun format` - Format code with Prettier
- `bun build` - Build frontend for production
- `bun db:studio` - Open database studio

## Code Style

### Imports
- Use ES modules (`import`/`export`)
- Group imports: Node.js built-ins, third-party, local imports
- Use `@/` alias for `src/` directory
- Use `#` alias for `backend/src/`

### TypeScript
- Strict mode enabled: noUnusedLocals, strictNullChecks
- Use `interface` for object shapes, `type` for unions/primitives
- Prefer explicit types over inference

### Naming Conventions
- PascalCase: classes, interfaces, types, components
- camelCase: functions, variables, methods
- snake_case: database columns, constants
- kebab-case: file names, URLs

### Vue.js
- Use Composition API with `<script setup>`
- Prefer `ref` for reactive primitives, `reactive` for objects
- Use composables for reusable logic
- File names match component names

### Error Handling
- Use `try/catch` for async operations
- Throw specific Error types with descriptive messages
- Log errors with console.log and chalk ex `console.log(chalk.yellow("message"))` use different color for each file 

### Backend (Hono/TypeScript)
- Use Zod schemas for request validation
- Prefer HTTP status codes for API responses
- Use dependency injection patterns
- Organize code by feature modules

### Testing
- Use Vitest for unit tests
- Use Vue Test Utils for component tests
- Use Cypress for E2E tests
- Mock external dependencies in tests