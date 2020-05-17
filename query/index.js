const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const postsData = {};

app.get("/posts", (req, res) => {
  res.send(postsData);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    postsData[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId } = data;

    const post = postsData[postId];
    post.comments.push({ id, content });
  }

  console.log(postsData);

  res.send({});
});

app.listen(4002, (req, res) => {
  console.log("Query service running on port 4002");
});
