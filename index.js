// // import express from "express";
// // import mongoose from "mongoose";
// // import dotenv from "dotenv";
// // import cors from "cors";
// //     import router from "./routes/product.routes.js";
// // import authrouter from "./routes/auth.routes.js";
// // import OrderRouter from "./routes/order.routes.js";

// // dotenv.config();

// // const app = express();

// // // ================= MIDDLEWARE =================
// // app.use(express.json());
// // // app.use(cors());
// // // app.use(cors());
// // app.use(cors({
// //   origin: "https://e-comfrontend.vercel.app",
// //   credentials: true,
// //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
// //   allowedHeaders: ["Content-Type", "Authorization"]
// // }));

// // app.options("*", cors());
// // // ================= ROUTES =================
// // app.use("/api/products", router);
// // app.use("/api/auth", authrouter);
// // app.use("/api/order", OrderRouter);

// // // ================= BASIC ROUTE =================
// // app.get("/", (req, res) => {
// //   res.send("API is running...");
// // });
// // app.use((err, req, res, next) => {
// //   console.error("🔥 SERVER ERROR:", err);
// //   res.status(500).json({ error: err.message });
// // });
// // // ================= DATABASE CONNECTION =================
// // mongoose
// //   .connect(process.env.MONGO_URI)
// //   .then(() => {
// //     console.log("MongoDB Connected Successfully");
// //   })
// //   .catch((err) => {
// //     console.log("Database Connection Error:", err.message);
// //   });

// // // ================= SERVER START =================
// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// import router from "./routes/product.routes.js";
// import authrouter from "./routes/auth.routes.js";
// import OrderRouter from "./routes/order.routes.js";

// dotenv.config();

// const app = express();

// app.use(express.json());

// app.use(cors({
//   origin: ["http://localhost:3000", "https://e-comfrontend.vercel.app"],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// // ✅ ROUTES
// app.use("/api/products", router);
// app.use("/api/auth", authrouter);
// app.use("/api/order", OrderRouter);

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // ✅ ERROR HANDLER
// app.use((err, req, res, next) => {
//   console.error("🔥 SERVER ERROR:", err);
//   res.status(500).json({ error: err.message });
// });

// // ✅ DATABASE
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected Successfully"))
//   .catch(err => console.log("Database Connection Error:", err.message));

// // ✅ SERVER
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import dbConnect from "./lib/dbConnect.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ---------- Middleware ---------- */
app.use(express.json());

app.use(cors({
  origin: "https://e-comfrontend.vercel.app",
  credentials: true,
}));

/* ---------- DB Connection ---------- */
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (err) {
    next(err);
  }
});

/* ---------- API Routes ---------- */
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

/* ---------- Serve Frontend ---------- */
app.use(express.static(path.join(__dirname, "dist")));

/* SPA fallback (VERY IMPORTANT) */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

/* ---------- Error Handler ---------- */
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ error: err.message });
});

/* ---------- Export for Render ---------- */
export const handler = serverless(app);