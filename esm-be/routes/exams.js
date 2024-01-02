const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const TestTemp = require('../model/TestTemp');

require('dotenv').config();

router.post('/create-test-temp', auth, async (req, res) => {
   const {
      teacherId,
      testName,
      category,
      minutes,
      rules,
      className,
      outOfMarks,
      answers,
      questions,
      section,
      level,
      startTime,
   } = req.body;
   try {
      let createTest = new TestTemp({
         teacherId,
         level,
         testName,
         category,
         answers,
         minutes,
         className,
         rules,
         outOfMarks,
         questions,
         section,
         startTime, //'2023-01-01T12:00:00'
      });

      let data = await createTest.save();

      const payload = {
         data,
      };

      return res.status(200).json({
         payload,
      });
   } catch (err) {
      res.status(500).send('Error in Saving');
   }
});

router.put('/update-test-temp/:testTempId', auth, async (req, res) => {
   const testTempId = req.params.testTempId;
   const updateData = req.body;
   try {
      await TestTemp.findOneAndUpdate(
         { _id: testTempId },
         updateData,
         { new: true }, // Option để trả về dữ liệu đã cập nhật
         function (err, updatedData) {
            if (err) {
               return res.status(400).json({ message: 'Failed to update document' });
            }
            return res.status(200).json({
               data: updatedData,
               message: 'Test successfully updated',
            });
         },
      );
   } catch (err) {
      res.status(500).send('Error in Updating');
   }
});

router.get('/test-temp/search', auth, async (req, res) => {
   const { testName, className, category } = req.query;
   const conditions = {};

   if (testName) {
      conditions.testName = testName;
   }

   if (className) {
      conditions.className = className;
   }
   if (category) {
      conditions.category = category;
   }
   try {
      await TestTemp.find(conditions, function (err, obj) {
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
 * @method - DELETE
 * @param - /delete-questions/:questionsid
 * @description - Delete a particular question using questionsID
 */
router.delete('/delete-exam/:examId', auth, async (req, res) => {
   const examId = req.params.examId;

   try {
      await TestTemp.findByIdAndDelete(examId, function (err) {
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
