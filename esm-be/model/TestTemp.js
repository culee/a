const mongoose = require('mongoose');

const TestTempSchema = mongoose.Schema({
   teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
   },
   testName: {
      type: String,
   },
   category: {
      type: String,
   },
   className: {
      type: String,
   },
   section: {
      type: String,
   },
   minutes: {
      type: Number,
   },
   rules: {
      type: Array,
   },
   outOfMarks: {
      type: Number,
   },
   questions: {
      type: Array,
   },
   assignedTo: {
      type: Array,
   },
   attempted: {
      type: Boolean,
   },
   answers: {
      type: Array,
   },
   startTime: {
      type: Date,
   },
});

module.exports = mongoose.model('testTemps', TestTempSchema);
