import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connection = async ( ) => {
    try
    {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOOSE_URL}/${DB_NAME}`);

        console.log(`\n MongoDB Connected! \n DB host: ${connectionInstance.connection.host}`);
    }
    catch(error)
    {
        console.log("MongoDB Connection Could not be done \n\n", error);
        process.exit(1);
    }
}

export { connection }