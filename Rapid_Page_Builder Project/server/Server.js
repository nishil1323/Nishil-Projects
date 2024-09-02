const express = require("express");
const app = express();
const cors = require("cors");
const RegisterRouter = require("./Controllers/Registration");
const BlogRoutes = require('./Controllers/blog');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/user", RegisterRouter);
app.use("/blog", BlogRoutes);

app.listen(5000, () => {
  console.log("Server listening at port 5000");
});
