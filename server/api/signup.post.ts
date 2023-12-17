import { auth } from "~/server/auth/lucia";
import { LibsqlError } from "@libsql/client";

export default defineEventHandler(async (event) => {
    const { username, email, password } = await readBody<{
        username: unknown;
        email: unknown;
        password: unknown;
    }>(event);
    // basic checks
    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31
    ) {
        throw createError({
            message: "Invalid username",
            statusCode: 400
        });
    }
    if (
        typeof email !== "string" ||
        !email.includes('@')
    ) {
        throw createError({
            message: "Invalid email",
            statusCode: 400
        });
    }
    if (
        typeof password !== "string" ||
        password.length < 6 ||
        password.length > 255
    ) {
        throw createError({
            message: "Invalid password",
            statusCode: 400
        });
    }
    try {
        const user = await auth.createUser({
            key: {
                providerId: "username", // auth method
                providerUserId: username.toLowerCase(), // unique id when using "username" auth method
                password // hashed by Lucia
            },
            attributes: {
                username,
                email
            }
        });
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {}
        });
        const authRequest = auth.handleRequest(event);
        authRequest.setSession(session);
        return sendRedirect(event, "/"); // redirect to profile page
    } catch (e) {
        // check for unique constraint error in user table
        if (e instanceof LibsqlError && e.code === "SQLITE_CONSTRAINT") {
            throw createError({
                message: "Username or email already taken",
                statusCode: 400
            });
        }
        throw createError({
            message: "An unknown error occurred",
            statusCode: 500
        });
    }
});
