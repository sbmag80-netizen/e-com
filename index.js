import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
    import router from "./routes/product.routes.js";
import authrouter from "./routes/auth.routes.js";
import OrderRouter from "./routes/order.routes.js";

dotenv.config();

const app = express();

// ================= MIDDLEWARE =================
app.use(express.json());
// app.use(cors());
// app.use(cors());
app.use(cors({
  origin: "https://e-comfrontend.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());
// ================= ROUTES =================
app.use("/api/products", router);
app.use("/api/auth", authrouter);
app.use("/api/order", OrderRouter);

// ================= BASIC ROUTE =================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ================= DATABASE CONNECTION =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("Database Connection Error:", err.message);
  });

// ================= SERVER START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});