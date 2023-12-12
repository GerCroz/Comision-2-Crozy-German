import 'dotenv/config';

export const config = {
    port: process.env.PORT || 3000,
    mongo_uri: process.env.MONGO_URI || 'mongo://127.0.0.1:27017',
    jwt_secret: process.env.JWT_SECRET || '$3CR3T',
    database_name: process.env.DATABASE_NAME || 'final-app',
};