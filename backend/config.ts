import { config } from 'dotenv';
config({ path: '.env.local' });

export const DB_TYPE: any = process.env.DB_TYPE;
export const SECRET: string | undefined = process.env.SECRET;
export const HOST: string | undefined = process.env.HOST;
export const USER_DB_NAME: string | undefined = process.env.USER_DB_NAME;
export const USER_DB_PASSWORD: string | undefined = process.env.USER_DB_PASSWORD;
export const PORT: number = parseInt(process.env.PORT || '3306', 10);
export const DATABASE_NAME: string | undefined = process.env.DATABASE_NAME;