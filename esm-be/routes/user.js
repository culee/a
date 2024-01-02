const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/User');
const Student = require('../model/Student');
const Teacher = require('../model/Teacher');
const auth = require('../middleware/auth');
const { STUDENT, TEACHER } = require('../utils/roles');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const { baseURL } = require('../utils/roles');
const { sendEmailHtmlForm } = require('../constants/email');
require('dotenv').config();

//transporter for nodemailer
var transporter = nodemailer.createTransport(
   smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
         user: process.env.GMAIL_USER,
         pass: process.env.GMAIL_PASS,
      },
   }),
);

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
   '/signup',
   [
      check('email', 'Please enter a valid email').isEmail(),
      check('password', 'Please enter a valid password').isLength({
         min: 6,
      }),
   ],
   async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
         });
      }

      const { firstName, lastName, email, password, phone, className, section, role } = req.body;

      try {
         let user = await User.findOne({
            email,
         });

         if (user) {
            return res.status(400).json({
               msg: 'User Already Exists',
            });
         }

         user = new User({
            firstName,
            lastName,
            email,
            password,
            phone,
            role,
            className,
            section,
         });

         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(password, salt);

         const userData = await user.save();

         switch (role) {
            case STUDENT:
               try {
                  const student = Student({
                     profileInfo: userData._id,
                     attemptedTests: [],
                  });
                  await student.save();
               } catch (err) {
                  return res.status(500).send('Error in Saving Student');
               }
               break;

            case TEACHER:
               try {
                  const teacher = Teacher({
                     profileInfo: userData._id,
                     assignedTests: [],
                  });
                  await teacher.save();
               } catch (err) {
                  return res.status(500).send('Error in Saving Teacher');
               }
               break;

            default:
               break;
         }

         const payload = {
            user: {
               id: user.id,
            },
         };

         jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
               expiresIn: '3h',
            },
            (err, token) => {
               if (err) throw err;

               //cookie
               res.status(200).json({
                  token,
                  user,
               });
            },
         );
      } catch (err) {
         res.status(500).send('Error in Saving');
      }
   },
);

/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */

router.post(
   '/login',
   [
      check('email', 'Please enter a valid email').isEmail(),
      check('password', 'Please enter a valid password').isLength({
         min: 6,
      }),
   ],
   async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         return res.status(400).json({
            errors: errors.array(),
         });
      }

      const { email, password } = req.body;
      try {
         let user = await User.findOne({
            email,
         });
         if (!user)
            return res.status(400).json({
               message: 'User Not Exist',
            });

         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch)
            return res.status(400).json({
               message: 'Incorrect Password !',
            });

         const payload = {
            user,
         };

         switch (user.role) {
            case STUDENT:
               let studentData = await Student.findOne({
                  profileInfo: user.id,
               });

               const studentProfileID = studentData._id;
               payload.profileID = studentProfileID;
               break;

            case TEACHER:
               let teacherData = await Teacher.findOne({
                  profileInfo: user.id,
               });

               const teacherProfileID = teacherData._id;
               payload.profileID = teacherProfileID;
               break;
            default:
               console.log('OK');
         }

         jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
               expiresIn: '3h',
               //3 hrs
            },
            (err, token) => {
               if (err) throw err;
               if (!user.isVerified) {
                  const url = `${baseURL}/user/confirm/${token}`;
                  transporter.sendMail(
                     {
                        to: user.email,
                        subject: 'Confirm Email',
                        html: sendEmailHtmlForm({ url }),
                     },
                     function (error, info) {
                        if (error) {
                           console.log(error);
                        } else {
                           console.log('Email sent: ' + info.response);
                        }
                     },
                  );
               }
               res.status(200).json({
                  payload,
                  token,
               });
            },
         );
      } catch (e) {
         console.error(e);
         res.status(500).json({
            message: 'Server Error',
         });
      }
   },
);

/**
 * @method - GET
 * @param - /confirm/:token
 * @description - Email Verification
 */

router.get('/confirm/:token', async (req, res) => {
   const token = req.params.token;
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;

      await User.updateOne({ _id: req.user.id }, { isVerified: true }, function (err, message) {
         if (err) {
            return res.status(500).json({ message: 'Verification Failed' });
         } else {
            return res.status(200).json({
               message: 'Email Verified!',
            });
         }
      });
   } catch (e) {
      console.error(e);
      return res.status(500).send({ message: 'Verification Failed' });
   }
});

module.exports = router;
