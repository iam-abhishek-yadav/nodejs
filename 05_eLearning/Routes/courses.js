const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const { z } = require("zod");

const courseSchema = z.object({
  title: z.string().min(5).max(255),
  category: z.string().min(3).max(30),
  creator: z.string().min(3),
  rating: z.number(),
});

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const validatedData = courseSchema.parse(req.body);
    const course = new Course(validatedData);
    const savedCourse = await course.save();
    res.send(savedCourse);
  } catch (error) {
    res.status(400).send(error.errors);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const validatedData = courseSchema.parse(req.body);
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true }
    );
    if (!course) {
      return res.status(404).send("The course with the given ID was not found");
    }
    res.send(course);
  } catch (error) {
    res.status(400).send(error.errors);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndRemove(req.params.id);
    if (!course) {
      return res.status(404).send("The course with the given ID was not found");
    }
    res.send(course);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send("The course with the given ID was not found");
    }
    res.send(course);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
