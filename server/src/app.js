import express from "express";

import cors from "cors";

import morgan from "morgan";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/authroutes.js";

import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Expense Tracker API Running...");
});

app.use("/api/auth", authRoutes);

app.use("/api/transactions", transactionRoutes);

export default app;
