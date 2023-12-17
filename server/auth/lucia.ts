import { h3 } from "lucia/middleware";
import { lucia } from "lucia";
import { libsql } from "@lucia-auth/adapter-sqlite";
import { createClient } from "@libsql/client";

const db = createClient({
    url: process.env.DATABASE_URL!
});

export const auth = lucia({
    adapter: libsql(db, {
        user: "user",
        key: "user_key",
        session: "user_session"
    }),
    env: process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV',
    middleware: h3(),
    getUserAttributes: (data) => {
        return {
            username: data.username,
            email: data.email
        };
    }
});

export type Auth = typeof auth;
