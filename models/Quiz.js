const mongoose = require('mongoose');
const QuizSchema = new mongoose.Schema({
 question: String,
 options: [
    {
        optionA: {
            type: String,
            required: true
        },
        optionB: {
            type: String,
            required: true
        },
        optionC: {
            type: String,
            required: true
        },
        optionD: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true,

        }
    }
]

})

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;

 /* options: {
    optionA: String,
    optionB: String,
    optionC: String,
    optionD: String,
    answer: String
 } */

