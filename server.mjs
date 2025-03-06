import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import cors from "cors";


const app = express();

app.use(cors());



const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get all posts
app.get("/posts", (req, res) => {
  fs.readFile(
    path.join(__dirname, "public", "bd.json"),
    "utf8",
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error reading file");
      }
      const bd = JSON.parse(data);
      res.status(200).json(bd.posts);
    }
  );
});

// Get a single post by ID
app.get("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  fs.readFile(
    path.join(__dirname, "public", "bd.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Error reading database file:", err);
        return res.status(500).send("Error reading database file");
      }
      const bd = JSON.parse(data);
      const post = bd.posts.find((p) => p.id === postId);
      if (!post) {
        return res.status(404).send("Post not found");
      }
      res.status(200).json(post);
    }
  );
});

// Create a new post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send({ error: "Title and content are required" });
  }

  fs.readFile(
    path.join(__dirname, "public", "bd.json"),
    "utf8",
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error reading file");
      }

      const db = JSON.parse(data);
      let newPostId = 1;

      // Generate a new post ID: check if there are existing posts and assign the next ID.
      if (db.posts && db.posts.length > 0) {
        newPostId = db.posts[db.posts.length - 1].id + 1;
      }

      const newPost = {
        id: newPostId,
        title,
        content,
        comments: [],
      };

      db.posts.push(newPost);

      fs.writeFile(
        path.join(__dirname, "public", "bd.json"),
        JSON.stringify(db, null, 2),
        "utf8",
        (error) => {
          if (error) {
            console.log(error);
            return res.status(500).send("Error writing file");
          }
          res.status(201).json(newPost);
        }
      );
    }
  );
});

// Update a post
app.put("/posts/:id", (req, res) => {
  const postId = Number(req.params.id);
  const updatedPostData = req.body; // The updated post data from the client

  fs.readFile(
    path.join(__dirname, "public", "bd.json"),
    "utf8",
    (error, data) => {
      if (error) {
        console.error("Error reading file:", error);
        return res.status(500).send("Error reading file");
      }

      const db = JSON.parse(data);
      const postIndex = db.posts.findIndex((p) => p.id === postId);

      if (postIndex === -1) {
        return res.status(404).send("Post not found");
      }

      // Update the post data
      db.posts[postIndex] = { ...db.posts[postIndex], ...updatedPostData };

      // Write the updated data back to the file
      fs.writeFile(
        path.join(__dirname, "public", "bd.json"),
        JSON.stringify(db, null, 2),
        "utf8",
        (writeError) => {
          if (writeError) {
            console.error("Error writing file:", writeError);
            return res.status(500).send("Error writing file");
          }

          res.status(200).json(db.posts[postIndex]);
        }
      );
    }
  );
});

app.delete("/posts/:id", (req, res) => {
  const getId = req.params.id;

  fs.readFile(
    path.join(__dirname, "public", "bd.json"),
    "utf8",
    (error, data) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error reading file");
        return;
      }
      const jsonGetData = JSON.parse(data);
      jsonGetData.posts = jsonGetData.posts.filter((post) => post.id != getId);

      fs.writeFile(
        path.join(__dirname, "public", "bd.json"),
        JSON.stringify(jsonGetData, null, 2),
        "utf8",
        (error) => {
          if (error) {
            console.log(error);
            res.status(500).send("Error writing file");
            return;
          }
          res.status(200).send("Post is deleted");
        }
      );
    }
  );
});

// Add a comment to a post
app.post("/posts/:id/comments", (req, res) => {
  const postId = Number(req.params.id);

  if (isNaN(postId) || postId < 1) {
    return res.status(400).send({ error: "Invalid post ID" });
  }

  const newComment = req.body.content;
  if (!newComment || typeof newComment !== "string") {
    return res.status(400).send({ error: "Invalid comment" });
  }

  fs.readFile(
    path.join(__dirname, "public", "bd.json"),
    "utf8",
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error reading file");
      }
      const db = JSON.parse(data);
      const post = db.posts.find((p) => p.id === postId);

      if (!post) {
        return res.status(404).send({ error: "Post not found" });
      }

      post.comments.push(newComment);

      fs.writeFile(
        path.join(__dirname, "public", "bd.json"),
        JSON.stringify(db, null, 2),
        "utf8",
        (error) => {
          if (error) {
            console.log(error);
            return res.status(500).send("Error writing file");
          }
          res
            .status(201)
            .json({ message: "Comment added", comment: newComment });
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
