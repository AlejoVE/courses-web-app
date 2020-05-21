"use strict";

const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const config = require("../config");
const DATA_DIR = path.join(__dirname, "/..", config.DATA_DIR, "/courses.json");

const controllers = {
  hello: (req, res) => {
    res.json({ api: "courses!" });
  },
  getCourses: async (req, res) => {
    try {
      const files = await readFile(DATA_DIR, "utf-8");
      const json = JSON.parse(files);
      res.json({ status: "ok", courses: json });
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong");
    }
  },
  addCourse: async (req, res) => {
    try {
      const { error } = validateCourse(req.body); //object destructuring
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }

      const description = req.body.description;
      const name = req.body.name;
      const content = await readFile(DATA_DIR, "utf-8");
      const courses = JSON.parse(content);
      const id = courses.length + 1;

      const newCourse = {
        id: id,
        name: name,
        description: description,
      };
      courses.push(newCourse);

      const json = JSON.stringify(courses, null, "");
      await writeFile(DATA_DIR, json);
      res.send(newCourse);
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  },
  getCourse: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const content = await readFile(DATA_DIR, "utf-8");
      const courses = JSON.parse(content);
      const courseFiltered = courses.find((course) => course.id === id);

      if (!courseFiltered) {
        res.status(404).send(`The course with the ID: ${id} is not found`);
        return;
      }
      res.json(courseFiltered);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong");
    }
  },
  modifyCourse: async (req, res) => {
    try {
      const { error } = validateCourse(req.body); //object destructuring
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }
      const description = req.body.description;
      const name = req.body.name;

      const id = parseInt(req.params.id);
      const content = await readFile(DATA_DIR, "utf-8");
      const courses = JSON.parse(content);
      const courseFiltered = courses.find((course) => course.id === id);
      courseFiltered.description = description;
      courseFiltered.name = name;
      const json = JSON.stringify(courses, null, "");
      await writeFile(DATA_DIR, json);

      res.json(courseFiltered);
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong");
    }
  },
  deleteCourse: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const content = await readFile(DATA_DIR, "utf-8");
      const courses = JSON.parse(content);
      const courseFiltered = courses.find((course) => course.id === id);

      if (courseFiltered) {
        const index = courses.indexOf(courseFiltered);
        const coursesSpliced = courses.splice(index, 1);
        const newText = JSON.stringify(courses, null, "");
        await writeFile(DATA_DIR, newText);
        res.json(courseFiltered);
      }
      res.status(404).send("File not found");
    } catch (error) {
      console.log(error);
      res.status(500).send("Something went wrong");
    }
  },
};

function validateCourse(course) {
  const schema = {
    //name should be a string with a minimum of 3 characters
    name: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
  };

  return Joi.validate(course, schema);
}

module.exports = controllers;
