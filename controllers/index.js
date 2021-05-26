const models = require("../database/models");

const createPost = async (req, res) => {
  try {
    const post = await models.Post.create(req.body);
    return res.status(201).json({
      post
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await models.Post.findAll({});
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await models.Post.findOne({
      where: { id: postId },
      include: [
        {
          model: models.Comment,
          as: "comments",
          include: [
            {
              model: models.User,
              as: "author"
            }
          ]
        },
        {
          model: models.User,
          as: "author"
        }
      ]
    });
    if (post) {
      return res.status(200).json({ post });
    }
    return res.status(404).send("Post with the specified ID does not exists");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const [updated] = await models.Post.update(req.body, {
      where: { id: postId }
    });
    if (updated) {
      const updatedPost = await models.Post.findOne({ where: { id: postId } });
      return res.status(200).json({ post: updatedPost });
    }
    throw new Error("Post not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const deleted = await models.Post.destroy({
      where: { id: postId }
    });
    if (deleted) {
      return res.status(204).send("Post deleted");
    }
    throw new Error("Post Inexistente");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const createComment = async (req, res) => {
  try {
    const comment = await models.Comments.create(req.body);
    return res.status(201).json({
      comment
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getAllComment = async (req, res) => {
  try {
    const comments = await models.Comments.findAll({});

    return res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getCommentById = async (req, res) => {
    const { commentId } = req.params;
    const comments = await models.Comments.findOne({
      where: { id: commentId },     
    });
    return res.status(200).send(comments)
}

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const deleted = await models.Comments.destroy({
      where: { id: commentId }
    });
    console.log(deleted)
    if (deleted) {
      return res.status(200).send("Comment deletado");
    }
    throw new Error("Comment Inexistente");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const putComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    let commentUpdated = req.body
    let comment = await models.Comments.update(commentUpdated, { where: {id:commentId} });    
    return res.status(200).json({ comment });
  } 
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  
  createComment,
  putComment,
  createPost,
  getAllPosts,
  getAllComment,
  getCommentById,
  getPostById,
  deleteComment,
  updatePost,
  deletePost
};