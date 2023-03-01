const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String },
  image: { type: String, required: true },
  location: { type: String, required: true },
  postedAt: { type: String, required: true },
  price: { type: Number, required: true },
});

const PostModel = mongoose.model("postclassified", postSchema);

module.exports = {
  PostModel,
};
