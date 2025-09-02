# Stage 1: Install dependencies
FROM oven/bun:1.0 as deps
WORKDIR /app

# Copy only the necessary files to install dependencies
COPY package.json bun.lockb ./
COPY backend/package.json backend/bun.lockb ./backend/

# Install all dependencies
RUN bun install --frozen-lockfile

# ---

# Stage 2: Build the application
FROM deps as build
WORKDIR /app

# Copy the rest of the source code
COPY . .

# Run your build command (if you have one)
# This is common for TypeScript projects.
# If you don't have a build step, you can remove this line.
RUN bun run --cwd ./backend build

# ---

# Stage 3: Final, small production image
FROM oven/bun:1.0-slim as release
WORKDIR /app

# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/node_modules ./backend/node_modules

# Copy the built code from the 'build' stage
COPY --from=build /app/backend/dist ./backend/dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/backend/package.json ./backend/package.json

# Expose the port your app listens on
EXPOSE 3000

# Set the command to run your application
# This should match the 'start' script in your backend/package.json
CMD ["bun", "run", "--cwd", "./backend", "start"]