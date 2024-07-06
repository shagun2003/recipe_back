import mongoose from "mongoose";

const Connection = async () => {
    try {
        await mongoose.connect(`mongodb+srv://user:mansi%402003@cluster1.z2k0zaz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

export default Connection;


/*
password:mansi@2003
*/