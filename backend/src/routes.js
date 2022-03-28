const express = require("express");
const router = express.Router();

const news = require("./app/routes/newsRouters");
const user = require("./app/routes/userRouters");
const AuthRoute = require("./app/routes/authRouters");
const complaint = require("./app/routes/complaintRouters");

router.get("/", (req, res) => {
  res.send(`API rodando na porta ${process.env.BASE_URL || 3001}`);
});

router.use("/news", news);
router.use("/users", user);
router.use("/auth", AuthRoute);
router.use("/complaints", complaint);

module.exports = router;
