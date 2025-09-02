import express, { json } from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import adminRouter from "./routes/adminRoute.js";
import storeRouter from "./routes/storeOwnerRoute.js";
import userRouter from "./routes/userRoute.js";
import cors from 'cors'


dotenv.config();
const app = express();
app.use(cors({
    origin:"*"
}))

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/owner", storeRouter);
app.use("/api/admin", adminRouter);


app.get('/ping',(req,res)=>{
    res.json({
        message:"pong",
        server:'live'
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
