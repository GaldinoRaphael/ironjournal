import express from "express";
import cors from "cors";
import register from "./register";
import login from "./login";
import exercise from "./exercise";

const app = express();
app.use(express.json());
app.use(cors())

app.use('/register', register);
app.use('/login', login);
app.use('/exercise', exercise);

app.listen(3000);
