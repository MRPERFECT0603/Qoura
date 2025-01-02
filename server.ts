
import express, { Express, Request , Response } from "express";
import Routes from "./Routes/userRoute";
const app:Express = express();
const PORT = 8000;

//middleware
app.use(express.json());
app.use("/api" , Routes);



app.listen(PORT , ()=>{
    console.log(`Server is up and running on ${PORT}.`);    
})