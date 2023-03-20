# Prisma

## 마이그레이션

Update the database schema with migrations
  
Usage

  $ prisma migrate [command] [options]

Commands for development

         dev   Create a migration from changes in Prisma schema, apply it to the database
               trigger generators (e.g. Prisma Client)
       reset   Reset your database and apply all migrations, all data will be lost

Commands for production/staging

      deploy   Apply pending migrations to the database 
      status   Check the status of your database migrations
     resolve   Resolve issues with database migrations, i.e. baseline, failed migration, hotfix

Command for any stage

        diff   Compare the database schema from two arbitrary sources

Options

  -h, --help   Display this help message
    --schema   Custom path to your Prisma schema

Examples

  Create a migration from changes in Prisma schema, apply it to the database, trigger generators (e.g. Prisma Client)
  $ prisma migrate dev

  Reset your database and apply all migrations
  $ prisma migrate reset

  Apply pending migrations to the database in production/staging
  $ prisma migrate deploy

  Check the status of migrations in the production/staging database
  $ prisma migrate status

  Specify a schema
  $ prisma migrate status --schema=./schema.prisma

  Compare the database schema from two databases and render the diff as a SQL script
  $ prisma migrate diff \
    --from-url "$DATABASE_URL" \
    --to-url "postgresql://login:password@localhost:5432/db" \
    --script


## 제너레이트

Usage

  $ prisma generate [options]

Options

    -h, --help   Display this help message
      --schema   Custom path to your Prisma schema
  --data-proxy   Enable the Data Proxy in the Prisma Client
       --watch   Watch the Prisma schema and rerun after a change

Examples

  With an existing Prisma schema
    $ prisma generate

  Or specify a schema
    $ prisma generate --schema=./schema.prisma

  Watch Prisma schema file and rerun after each change
    $ prisma generate --watch
    




npx prisma migrate dev --schema ./libs/database/src/usin/prisma/schema.prisma
npx prisma generate  --schema ./libs/database/src/usin/prisma/schema.prisma
