import Post from "../models/post.model.js";

//@desc Get all posts
//@route GET /api/posts
export const getPosts = async (req, res, next) => {
  const limit = parseInt(req.query.limit);
  try {
    const posts = await Post.find().limit(limit > 0 ? limit : undefined);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

//@desc Get single post
//@route GET /api/posts/:id
export const getPost = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      const error = new Error(`A post with the id of ${id} was not found`);
      error.status = 404;
      return next(error);
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

//@desc Create new post
//@route POST /api/posts/
export const createPost = async (req, res, next) => {
  try {
    const newPost = new Post({ title: req.body.title });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    next(err);
  }
};

//@desc Update post
//@route PUT /api/posts/:id
export const updatePost = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      const error = new Error(`A post with the id of ${id} was not found`);
      error.status = 404;
      return next(error);
    }
    post.title = req.body.title;
    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
};

//@desc Delete post
//@route DELETE /api/posts/:id
export const deletePost = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      const error = new Error(`A post with the id of ${id} was not found`);
      error.status = 404;
      return next(error);
    }
    await post.remove();
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    next(err);
  }
};
