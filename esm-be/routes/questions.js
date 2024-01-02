const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Questions = require('../model/Questions');
const User = require('../model/User');
require('dotenv').config();

/**
 * @method - GET
 * @param - /question
 * @description -
 */
router.get('/search', auth, async (req, res) => {
   const { testName, className, terms, level } = req.query;
   const conditions = {};
   if (level) {
      conditions.level = level;
   }

   if (testName) {
      conditions.testName = testName;
   }

   if (className) {
      conditions.className = className;
   }

   if (terms) {
      conditions.terms = terms;
   }

   try {
      await Questions.find(conditions, function (err, obj) {
         if (err) {
            return res.status(400).json({ err });
         }
         return res.status(200).json({
            obj,
         });
      });
   } catch (err) {
      res.status(500).send('Error in fetching Tests');
   }
});

/**
 * @method - POST
 * @param - /create-question
 * @description - Creating question for the students using teacherID
 */
router.post('/create-question', auth, async (req, res) => {
   const { teacherId, testName, className, answers, questions } = req.body;
   try {
      let savedQuestions = [];

      for (let i = 0; i < questions.length; i++) {
         let q = questions[i];
         let createQuestion = new Questions({
            teacherId,
            testName,
            className,
            terms: q.terms,
            description: q.description,
            level: q.level,
            options: q.options,
            answer: answers[i],
         });

         let data = await createQuestion.save();
         savedQuestions.push(data);
      }

      const payload = {
         data: savedQuestions,
      };

      return res.status(200).json({
         payload,
      });
   } catch (err) {
      console.log(err.message);
      res.status(500).send('Error in Saving');
   }
});

/**
 * @method - PUT
 * @param - /update-questions/:questionId
 * @description - Updating questions using questionID
 */
router.put('/update-question/:questionId', auth, async (req, res) => {
   const questionId = req.params.questionId;
   const updateData = req.body;
   try {
      const existingQuestion = await Questions.findById(questionId);
      if (!existingQuestion) {
         return res.status(404).json({ message: 'Question not found' });
      }

      existingQuestion.testName = updateData.testName;
      existingQuestion.className = updateData.className;
      existingQuestion.terms = updateData.terms;
      existingQuestion.description = updateData.description;
      existingQuestion.level = updateData.level;
      existingQuestion.options = updateData.options;
      existingQuestion.answer = updateData.answer;

      const updatedQuestion = await existingQuestion.save();
      return res.status(200).json({
         data: updatedQuestion,
      });
   } catch (err) {
      res.status(500).send('Error in Updating');
   }
});

/**
 * @method - DELETE
 * @param - /delete-questions/:questionsid
 * @description - Delete a particular question using questionsID
 */
router.delete('/delete-question/:questionId', auth, async (req, res) => {
   const questionId = req.params.questionId;
   try {
      await Questions.findByIdAndDelete(questionId, function (err) {
         if (err) {
            return res.status(400).json({ message: 'failed to delete document' });
         }
         return res.status(200).json({
            message: 'successfully deleted',
         });
      });
   } catch (err) {
      res.status(500).send('Error in Deleting');
   }
});

module.exports = router;
