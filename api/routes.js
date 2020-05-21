const controllers = require("./controllers.js");
const express = require("express");

const router = express.Router();

router.get("/", controllers.hello);

// write your routes
router.get("/courses", controllers.getCourses);
router.post("/courses", controllers.addCourse);
router.get("/courses/:id", controllers.getCourse);
router.put("/courses/:id", controllers.modifyCourse);
router.delete("/courses/:id", controllers.deleteCourse);

module.exports = router;
