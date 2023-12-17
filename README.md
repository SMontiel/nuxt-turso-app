# nuxt-turso-app

Simple Nuxt app with a Turso libSQL as database, kysely integration and Lucia Auth.

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Database management

First, create a Turso account, [follow their instructions](https://docs.turso.tech/tutorials/get-started-turso-cli/step-01-installation)
to install the Turso CLI and create a database.

``` bash
# Connect to your database
turso db shell <your-db-name>

# Generate type definitions from db
npx kysely-codegen --out-file database/db.d.ts

# Create migration
node -r esbuild-register database/migrate.ts create <migration-name>

# Apply migrations
export DATABASE_URL=<your-db-url>
node -r esbuild-register database/migrate.ts up

# Rollback migration
node -r esbuild-register database/migrate.ts down
```
