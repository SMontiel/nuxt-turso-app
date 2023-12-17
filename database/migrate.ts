import * as path from 'path'
import { promises as fs } from 'fs'
import { Kysely, Migrator, FileMigrationProvider } from 'kysely'
import { LibsqlDialect } from '@libsql/kysely-libsql'
import { run } from 'kysely-migration-cli'

const db = new Kysely<any>({
    dialect: new LibsqlDialect({
        url: process.env.DATABASE_URL
    }),
})

const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.join(__dirname, 'migrations')
    }),
})

run(db, migrator, 'database/migrations')
