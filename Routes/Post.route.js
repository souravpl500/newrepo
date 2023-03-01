const express = require("express");
const { PostModel } = require("../Models/Post.model");

const postRouter = express.Router();

postRouter.use(express.json());

postRouter.post("/postclassifieds", async (req, res) => {
  const payload = req.body;
  try {
    const newPost = new PostModel(payload);
    await newPost.save();
    res.status(201).json({ newPost, message: "New Post successfully Added" });
  } catch (err) {
    console.log("err :>> ", err);
    res.send({ msg: err });
  }
});

postRouter.get("/browseclassifieds", async (req, res) => {
  const { category = "", sort = "", name } = req.query;
  try {
    let data = await PostModel.find();

    if (category) {
      const filterCategory = data.filter((ele) => {
        return ele.category == category;
      });
      res.send(filterCategory);
    } else if (sort) {
      const sortDate = data.sort(function (a, b) {
        return new Date(a.postedAt) - new Date(b.postedAt);
      });
      res.send(sortDate);
    } else if (name) {
      const { page = 1, limit = 4 } = req.query;
      let data = await PostModel.find({ name: { $regex: name, $options: "i" } })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.send(data);
    } else {
      const { page = 1, limit = 4 } = req.query;
      let data = await PostModel.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.send(data);
    }
  } catch (err) {
    console.log("err :>> ", err);
    res.send({ err: err });
  }
});

postRouter.get('/post', (req, res) => {
  const query = {};
  let data = PostModel.find();
  if (req.query.category) {
    query.category = req.query.category;
  }
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
  }
  data.find(query, (error, ads) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(ads);
    }
  })
    .sort({ postedAt: req.query.sort === 'oldest' ? 1 : -1 })
    .skip(parseInt(req.query.page) * 4)
    .limit(4);
});

postRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await PostModel.findByIdAndDelete({ _id: id });
    res.json({ status: 200, message: "Deleted The Post" });
  } catch {
    res.send("err");
  }
});

module.exports = {
  postRouter,
};
