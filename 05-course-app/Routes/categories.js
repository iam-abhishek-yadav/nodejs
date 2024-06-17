const express = require("express");
const router = express.Router();
const Category = require("../models/categories");
const { z } = require("zod");

const categorySchema = z.object({
  name: z.string().min(3).max(255).refine((data) => data.trim().length > 0, {
    message: "Name is required",
  }),
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const validatedData = categorySchema.parse(req.body);
    const category = new Category({ name: validatedData.name });
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.json(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.json(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.json(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
