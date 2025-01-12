
import express, { Express, Request , Response } from "express";
import userRouter from "./Routes/userRoute";
import topicRouter from "./Routes/topicRoutes";
import followRouter from "./Routes/followRoutes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app:Express = express();
const PORT = 8000;

//middleware
app.use(express.json());
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api" , userRouter);
app.use("/api" , topicRouter);
app.use("/api" , followRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.listen(PORT , ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
})