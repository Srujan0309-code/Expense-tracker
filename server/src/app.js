import express from "express";

import cors from "cors";

import morgan from "morgan";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/authroutes.js";

import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
  ...(process.env.CLIENT_URLS ? process.env.CLIENT_URLS.split(",") : []),
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked origin: ${origin}`));
    },
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
