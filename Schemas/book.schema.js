const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  Book: { type: String, required: true },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: true,
  },
  section_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sections",
    required: true,
  },
  checked: { type: Boolean, required: false },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: false,
  },
  
},
{
    versionKey: false,
    timestamps: true,
  });

const book = mongoose.model("books", bookSchema);

module.exports = book;