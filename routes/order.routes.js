// routes/orderRoutes.js
import express from "express";
import { createOrder, getAllOrders, getUserOrders } from "../controller/ordercontroller.js";
import { protect } from "../lib/authMiddleware.js";

const OrderRouter = express.Router();

// Create order
OrderRouter.post("/", protect,createOrder);

// Get logged-in user orders
OrderRouter.get("/myorders", protect, getUserOrders);

// Get all orders (admin)
OrderRouter.get("/", protect, getAllOrders);

export default OrderRouter;