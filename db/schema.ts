import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";
import { user } from "@/auth-schema";

export const oauthApp = pgTable("oauth_app", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  clientId: text("client_id").notNull().unique(),
  clientSecret: text("client_secret").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  redirectUris: text("redirect_uris").notNull(),
  scopes: text("scopes").default("openid,profile,email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()).notNull(),
}, (table) => [
  index("oauth_app_userId_idx").on(table.userId),
  index("oauth_app_clientId_idx").on(table.clientId),
]);
