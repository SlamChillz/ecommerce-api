const userRoutes = require("express").Router();
const User = require("../controllers/user");

userRoutes.get("/users", User.all);
userRoutes.get("/user/:id", User.one);
userRoutes.post("/user", User.create);
userRoutes.delete("/user/:id", User.delete);
userRoutes.put("/user/:id", User.update);
userRoutes.patch("/user/:id/change-password", User.changePassword);

module.exports = { userRoutes };
