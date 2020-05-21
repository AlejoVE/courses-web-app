"use strict";

const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);

const config = require("../config");
const DATA_DIR = path.join(__dirname, "/..", config.DATA_DIR, "/courses.json");

const controllers = {
  hello: (req, res) => {
    res.json({ api: "courses!" });
  },
  getCourses: async (req, res) => {
    try {
      console.log(DATA_DIR);
      const files = await readFile(DATA_DIR, "utf-8");
      const json = JSON.parse(files);
      res.json({ status: "ok", courses: json });
    } catch (error) {
      res.status(500).send("Something went wrong");
    }
  },
};

module.exports = controllers;
