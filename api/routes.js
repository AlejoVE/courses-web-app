const controllers = require("./controllers.js");
const express = require("express");

const router = express.Router();

router.get("/", controllers.hello);

// write your routes
router.get("/courses", controllers.getCourses);
router.post("/courses", controllers.addCourse);
router.get("/course/:id", controllers.getCourse);

module.exports = router;
