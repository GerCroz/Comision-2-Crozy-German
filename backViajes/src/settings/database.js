import mongoose from "mongoose";

export const startDb = async ({uri, database}) => {
    try {
        await mongoose.connect(uri, {
            dbName: database
        })
        console.log('Conexion exitosa a la bases de datos');
        } catch (error) {
        console.log('Error starting database', error);
        }
}