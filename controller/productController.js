import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import dbConnect from "../lib/dbConnect.js";


// ================= CREATE PRODUCT =================
export const createProduct = asyncHandler(async (req, res) => {
      await dbConnect(); // 🔥 THIS IS CRITICAL

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});


// ================= GET ALL PRODUCTS =================
export const getAllProducts = asyncHandler(async (req, res) => {
      await dbConnect(); // 🔥 THIS IS CRITICAL

  const products = await Product.find();
console.log("FRRR");

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});


// ================= GET SINGLE PRODUCT =================
export const getSingleProduct = asyncHandler(async (req, res) => {
      await dbConnect(); // 🔥 THIS IS CRITICAL

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    success: true,
    product,
  });
});


// ================= UPDATE PRODUCT =================
export const updateProduct = asyncHandler(async (req, res) => {
      await dbConnects(); // 🔥 THIS IS CRITICAL

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    updatedProduct,
  });
});


// ================= DELETE PRODUCT =================
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
    await dbConnect(); // 🔥 THIS IS CRITICAL

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});