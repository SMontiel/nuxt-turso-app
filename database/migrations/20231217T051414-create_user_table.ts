import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('user')
        .addColumn('id', 'text', (col) => col.primaryKey().unique().notNull())
        .addColumn('username', 'text', (col) => col.unique().notNull())
        .addColumn('email', 'text', (col) => col.unique().notNull())
        .addColumn('created_at', 'timestamp', (col) =>
            col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .addColumn('updated_at', 'timestamp', (col) =>
            col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('user').execute();
}
