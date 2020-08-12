const express = require("express");
const app = express();
const connect = require("./config/database");
//intializing the connection to mongodb:
connect();
//middleware:
//gives ability to use req.body in our routes:
app.use(express.json({ extended: false }));

// defining routes:
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);

//initialing a port from either a enviromental variable, or 4000.
const PORT = process.env.PORT || 4000;
//starting the server
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
