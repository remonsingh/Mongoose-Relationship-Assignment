const express = require("express");
const mongoose = require("mongoose");
const books = require("./Schemas/book.schema.js");
const sections = require("./Schemas/section.schema.js");
const authors = require("./Schemas/author.schema.js");
const app = express();
app.use(express.json());
const connect = () => {
  return mongoose.connect("mongodb+srv://remonsingh:remon123@cluster0.ylca6.mongodb.net/Library");
};
// Get all books
app.get("/api/books", async (req, res) => {
  let data = await books
    .find({})
    .populate("aurthor_id")
    .populate("section_id")
    .lean()
    .exec();
  res.send(data);
});
// Create a new book
app.post("/api/books", async (req, res) => {
  try {
    const user = await books.create(req.body);

    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

// Get all books by section
app.get("/api/books/sectionId=:sectionId", async (req, res) => {
  let data = await books
    .find({ section_id: req.params.sectionId })
    .populate("aurthor_id")
    .populate("section_id")
    .lean()
    .exec();
  res.send(data);
});
// Get all books by Author
app.get("/api/books/authorId=:authorId", async (req, res) => {
  let data = await books
    .find({ aurthor_id: req.params.authorId })
    .populate("aurthor_id")
    .populate("section_id")
    .lean()
    .exec();
  res.send(data);
});
// Get all books by Author and Section
app.get(
  "/api/books/sectionId=:sectionId/authorId=:authorId",
  async (req, res) => {
    let data = await books
      .find({
        $and: [
          { author_id: req.params.authorId },
          { section_id: req.params.sectionId },
        ],
      })
      .populate("aurthor_id")
      .populate("section_id")
      .lean()
      .exec();
    res.send(data);
  }
);
// Check a book
app.patch("/api/books/bookId=:bookId/userId=:userId", async (req, res) => {
  newData = req.body;
  let data = await books.findByIdAndUpdate(
    req.params.bookId,
    { ...newData, checked: true, user_id: req.params.userId },
    {
      new: true,
    }
  );
  res.send(data);
});
// Get all checked books
app.get("/api/books/checked", async (req, res) => {
  let data = await books
    .find({ checked: true })
    .populate("aurthor_id")
    .populate("section_id")
    .lean()
    .exec();
  res.send(data);
});

const start = async () => {
  await connect();
  app.listen(8080, () => {
    console.log("Server Started");
  });
};

start();