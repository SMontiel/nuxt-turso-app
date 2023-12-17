import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface User {
  created_at: Generated<string>;
  email: string;
  id: string;
  updated_at: Generated<string>;
  username: string;
}

export interface UserKey {
  created_at: Generated<string>;
  hashed_password: string | null;
  id: string;
  updated_at: Generated<string>;
  user_id: string;
}

export interface UserSession {
  active_expires: string;
  created_at: Generated<string>;
  id: string;
  idle_expires: string;
  updated_at: Generated<string>;
  user_id: string;
}

export interface DB {
  user: User;
  user_key: UserKey;
  user_session: UserSession;
}
