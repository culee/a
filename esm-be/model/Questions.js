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
   section: {
      type: String,
      required: true,
   },
   questions: {
      type: Array,
      required: true,
   },
   answers: {
      type: Array,
      required: true,
   },
});

module.exports = mongoose.model('questions', QuestionSchema);
