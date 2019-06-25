const express = require("express");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");

const routes = new express.Router();
const upload = multer(uploadConfig);

routes.get("/posts", PostController.index); // Fetch all posts
routes.post("/posts", upload.single("image"), PostController.store); // Image upload

routes.post("/posts/:id/like", LikeController.store); // Likes

module.exports = routes;
