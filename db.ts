import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as authSchema from '@/auth-schema';
import * as dbSchema from '@/db/schema';

const schema = { ...authSchema, ...dbSchema };

export const db = drizzle(process.env.DATABASE_URL!, { schema });
