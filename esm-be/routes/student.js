const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Student = require('../model/Student');
const Test = require('../model/Test');
const User = require('../model/User');
require('dotenv').config();

/**
 * @method - GET
 * @param - /profile/:profileID
 * @description - Fetch student profile using profileID
 */

router.get('/profile/:profileID', auth, async (req, res) => {
   const profileID = req.params.profileID;

   try {
      await Student.findOne({
         _id: profileID,
      })
         .populate('profileInfo')
         .exec(function (err, obj) {
            if (err) {
               return res.status(400).json({ err });
            } else {
               return res.status(200).json({
                  obj,
               });
            }
         });
   } catch (err) {
      res.status(500).send('Error in fetching Student Data');
   }
});

/**
 * @method - GET
 * @param - /tests/:studentClass
 * @description - Fetch all the tests that student class assigned
 */

router.get('/tests/:studentClass', auth, async (req, res) => {
   const studentClass = req.params.studentClass;
   const { startTime } = req.query;
   const query = {
      className: studentClass,
      $or: [{ endAt: { $exists: false } }, { endAt: { $gt: new Date() } }],
   };
   if (startTime) {
      query.startTime = { $gte: new Date(startTime) };
   }
   try {
      await Test.find(query, '-assignedTo -submitBy -teacherId -__v').exec(function (err, obj) {
         if (err) {
            return res.status(400).json({ err });
         }
         return res.status(200).json({
            obj,
         });
      });
   } catch (err) {
      res.status(500).send('Error in fetching Test Data');
   }
});

/**
 * @method - GET
 * @param - /attempt-tests/:studentID
 * @description - Fetch all attempted tests of student
 */

router.get('/attempt-tests/:studentID', auth, async (req, res) => {
   const studentID = req.params.studentID;
   const { startTime } = req.query;
   const query = { _id: studentID };
   if (startTime) {
      query.startTime = { $gte: new Date(startTime) };
   }

   try {
      await Student.find(query).exec(function (err, obj) {
         if (err) {
            return res.status(400).json({ err });
         }
         return res.status(200).json({
            obj,
         });
      });
   } catch (err) {
      res.status(500).send(err);
   }
});

/**
 * @method - POST
 * @param - /results/:studentID
 * @description - Fetch student results using studentID
 */

router.post('/results/:studentID', auth, async (req, res) => {
   const studentID = req.params.studentID;
   const { testID } = req.body;

   try {
      await Test.find(
         {
            _id: testID,
         },
         'submitBy -_id',
         function (err, obj) {
            if (err) {
               return res.status(400).json({ err });
            } else {
               const result = obj[0].submitBy.filter((student, index) => {
                  return student.id === studentID;
               });

               return res.status(200).json({
                  result,
               });
            }
         },
      );
   } catch (err) {
      res.status(500).send('Error in fetching Test Data');
   }
});

/**
 * @method - PUT
 * @param - /update-profile/:profileID
 * @description - Update student profile using profileID
 */

router.put('/update-profile/:profileID', auth, async (req, res) => {
   const profileID = req.params.profileID;
   //    const { firstName, lastName, email, password, phone, className, section } = req.body;
   try {
      await User.findOneAndUpdate({ _id: profileID }, { ...req.body }, function (err, updatedData) {
         if (err) {
            return res.status(400).json({ message: 'failed to update profile' });
         }
         return res.status(200).json({
            message: 'profile succesfully updated',
         });
      });
   } catch (err) {
      res.status(500).send('Error in Updating Profile');
   }
});

/**
 * @method - PUT
 * @param - /submit-test/:testID
 * @description - Submit particular test using testID
 */

router.put('/submit-test/:testID', auth, async (req, res) => {
   const testID = req.params.testID;
   const submittedData = req.body.submitBy;
   const testName = req.body.testName;
   const date = Date.now();

   try {
      await Test.updateOne(
         { _id: testID },
         {
            $addToSet: { submitBy: [...submittedData] },
            attempted: true,
         },
         async function (err, updatedData) {
            if (err) {
               return res.status(400).json({ message: 'failed to submit test' });
            }
            await Student.updateOne(
               { _id: submittedData[0].profileID },
               {
                  $addToSet: {
                     attemptedTest: [{ testName, date, ...submittedData }],
                  },
               },
            );
            return res.status(200).json({
               message: 'test submitted succesfully',
            });
         },
      );
   } catch (err) {
      res.status(500).send('Error in submitting test data');
   }
});

/**
 * @method - PUT
 * @param - /update-test-status/:testID
 * @description - Tracking how much time user spented on test using attemptedTime
 */

router.put('/update-test-status/:testID', auth, async (req, res) => {
   const testID = req.params.testID;
   const profileID = req.body.profileID;
   const testName = req.body.testName;
   const completed = req.body.completed;
   const attemptedTime = req.body.attemptedTime;
   const totalTime = req.body.totalTime;

   if (testID) {
      try {
         let studentData = await Student.findById(profileID);

         let { testStatus } = studentData;
         let test = testStatus.filter((t) => t.testID === testID);
         if (test.length < 1) {
            studentData.testStatus.push({
               testID,
               attemptedTime,
               testName,
               completed,
               totalTime,
            });
            studentData.save();
            return res.status(200).json({
               studentData,
            });
         }
         await Student.findOneAndUpdate(
            { _id: profileID, 'testStatus.testID': testID },
            {
               $set: {
                  'testStatus.$.attemptedTime': attemptedTime,
               },
            },
            { new: true },
            (err, obj) => {
               return res.status(200).json({
                  obj,
               });
            },
         );
      } catch (err) {
         res.status(500).send('Error in updating test data');
      }
   } else {
      res.status(500).send('Undefined Test ID');
   }
});

module.exports = router;
