import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import router from "./Router/index.js";
import dbConnect from "./utils/dbConnect.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use("/api/v1", router);

dbConnect()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is listening to port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
