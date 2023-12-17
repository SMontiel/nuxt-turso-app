import { Kysely } from "kysely";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { DB } from '~/database/db';

const db = new Kysely<DB>({
    dialect: new LibsqlDialect({
        url: process.env.DATABASE_URL
    }),
});
