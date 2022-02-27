const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("Thành công");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "Người dùng không tồn tại" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Sai tên đăng nhập và mật khẩu" });

    res.json("Đăng nhập thành công!!!");
  });
});

module.exports = router;