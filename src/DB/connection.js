import mongoose from "mongoose";
export  const  connection = async()=> {
        await mongoose.connect(process.env.DB_URI)
        .then(() =>console.log("Connected to the database!"))
        .catch((error) => console.log("Cannot connect to the database!", error))
}