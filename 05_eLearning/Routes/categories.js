const express = require("express");
const router = express.Router();
const Category = require("../models/categories");
const { z } = require("zod");
const mongoose = require("mongoose");

const categorySchema = z.object({
  name: z
    .string()
    .min(3)
    .refine((data) => data.length > 0, {
      message: "Name is required",
    }),
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const validatedData = categorySchema.parse(req.body);
    const category = new Category({ name: validatedData.name });
    const savedCategory = await category.save();
    res.send(savedCategory);
  } catch (error) {
    res.status(400).send(error.errors);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!category)
      return res
        .status(404)
        .send("The category with the given ID was not found");
    res.send(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category)
      return res
        .status(404)
        .send("The category with the given ID was not found");
    res.send(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .send("The category with the given ID was not found");
    res.send(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
