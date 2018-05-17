const mongoose = require('mongoose');
const config = require('config');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String,
        required: true
    },
    option2: {
        type: String,
        required: true
    },
    option3: {
        type: String,
        required: true
    },
    option4: {
        type: String,
        required: true
    },
    correctOption: {
        type: String,
        required: true
    }
});

const QuizSchema = new Schema({
    quizName: {
        type: String,
        required: true
    },
    Questions = [QuestionSchema]
})

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    timer: {
        type: Number,
        required: true
    },
    quiz: [QuizSchema]
});