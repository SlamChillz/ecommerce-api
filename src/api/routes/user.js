const userRoutes = require("express").Router();
const User = require("../controllers/user");
const { authorize } = require('../middlewares/authorization/authorize');

userRoutes.get("/users", User.all);
userRoutes.get("/user", authorize, User.one);
userRoutes.post("/user", User.register);
userRoutes.delete("/user/delete", authorize, User.delete);
userRoutes.put("/user/update", User.update);
userRoutes.patch("/user/change-password", authorize, User.changePassword);
userRoutes.post('/login', User.login);
userRoutes.get('/refresh-token', User.refresh);
userRoutes.delete('/logout', User.logout);

module.exports = { userRoutes };
