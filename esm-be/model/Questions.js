const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
   teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
   },
   testName: {
      type: String,
      required: true,
   },
   className: {
      type: String,
      required: true,
   },
   terms: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   level: {
      type: String,
      required: true,
   },
   options: {
      type: Array,
      required: true,
   },
   answer: {
      type: Number,
      required: true,
   },
});

module.exports = mongoose.model('questions', QuestionSchema);
