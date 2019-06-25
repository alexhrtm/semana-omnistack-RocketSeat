const Post = require("../models/Post");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
    // Fetch all posts
    async index(req, res) {
        const posts = await Post.find().sort("-createdAt");

        return res.json(posts);
    },

    // Create new post
    async store(req, res) {
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;

        // Jpg image
        const [name] = image.split(".");
        const fileName = `${name}.jpg`;

        // Resizing image
        await sharp(req.file.path)
            .resize(500)
            .jpeg({ quality: 70 })
            .toFile(path.resolve(req.file.destination, "resized", fileName));

        // Deleting bigger image
        fs.unlinkSync(req.file.path);

        // Saving into db
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName
        });

        req.io.emit("post", post);
        return res.json({ post });
    }
};
