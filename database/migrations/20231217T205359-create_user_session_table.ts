import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
    await db.schema
        .createTable('user_session')
        .addColumn('id', 'text', (col) => col.primaryKey().unique().notNull())
        .addColumn('user_id', 'text', (col) => col.notNull().references('user.id'))
        .addColumn('active_expires', 'bigint', (col) => col.notNull())
        .addColumn('idle_expires', 'bigint', (col) => col.notNull())
        .addColumn('created_at', 'timestamp', (col) =>
            col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .addColumn('updated_at', 'timestamp', (col) =>
            col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
    await db.schema.dropTable('user_session').execute();
}
