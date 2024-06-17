const express = require("express");
const router = express.Router();
const Student = require('../models/students');
const { z } = require("zod");

const studentSchema = z.object({
  name: z.string().min(3).refine((data) => data.length > 0, {
    message: "Name is required",
  }),
  isEnrolled: z.boolean().nullable().optional(),
  Phone: z.string().min(10).max(25),
});

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const validatedData = studentSchema.parse(req.body);
    const student = new Student({
      name: validatedData.name,
      isEnrolled: validatedData.isEnrolled || false,
      Phone: validatedData.Phone,
    });
    const savedStudent = await student.save();
    res.json(savedStudent);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        isEnrolled: req.body.isEnrolled || false,
        Phone: req.body.Phone,
      },
      { new: true }
    );
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.json(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.json(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.json(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
