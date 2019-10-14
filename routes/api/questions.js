const express = require("express");
const router = express.Router();
const questionHelper = require("./helpers/helper_questions");
// const passport = require("passport");

//Load Question Model
const Question = require("../../model/Questions");

// @route   GET api/questions
// @desc    Get All Questions
// @access  Public
router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    questionHelper.getQuestions(req, res);
  }
);

router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    questionHelper.postQuestions(req, res);
  }
);

router.post("/expert", (req, res) => {
  questionHelper.expert(req, res);
});

module.exports = router;
