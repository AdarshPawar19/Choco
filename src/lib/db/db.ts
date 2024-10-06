
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";


// for query purposes
// const queryString="postgresql://postgres.hfzqnfegyrrbzmmcdbco:hasdbsahdsadj@aws-0-ap-south-1.pooler.supabase.com:6543/postgres";
export const connection = postgres("postgresql://postgres.hfzqnfegyrrbzmmcdbco:hasdbsahdsadj@aws-0-ap-south-1.pooler.supabase.com:6543/postgres");
export const db = drizzle(connection);


