const express = require('express');
const Quizrouter = express.Router();
const Quiz = require('../models/Quiz');
const { all } = require('./User');

//Create a new question
Quizrouter.post('/question',async (req,res) => {

 try {
    const { question, options } = req.body;

    const newQuestion = await Quiz.create({
        question,
        options
    });
    
   return res.status(200).json(newQuestion);
 } catch (error) {
    return res.status(500).json({'Error': error})
 } 
  });

// Get All Questions
Quizrouter.get('/questions',async (req, res)=>{
try {
    const allQuestions =await Quiz.find();
    return res.status(200).json(allQuestions);
} catch (error) {
    return res.status(500).json({'Error': error});
}
  });

//Get one Question

Quizrouter.get('/questions/:id',async (req, res) => {
try {
   const _id = req.params.id;
   const question =await Quiz.findOne({_id});
   if(!question){
     return res.status(404).json(`Sorry Question With ID ${_id} Was Not Found`);
   }else{
     return res.status(200).json(question);
   }
} catch (error) {
    return res.status(500).json({"Error": error});
}
  });

// Update Question
Quizrouter.put('/questions/:id',async (req, res) => {
     try {
        const { question, options } = req.body;
        const _id = req.params.id;

        let questions = await Quiz.findOne({_id});

        if(!questions){
            const newQuestionUpdate = Quiz.create({
                question,
                options
            });
            return res.status(200).json(newQuestionUpdate);
        }else{
            questions.question = question;
            questions.options = options;
            await questions.save();
            return res.status(200).json(questions);
        }
     } catch (error) {
         return res.status(200).json({"Error": error});
     }
});

//Delete a Question

Quizrouter.delete('/questions/:id', async (req, res) => {
 try {
    const _id = req.params.id;
    const question =await Quiz.deleteOne({_id});
 
    if(question.deletedCount === 0){
       return res.status(404).json(`Sorry Question With ID ${_id} Was Not Found`);
    }else{
       return res.status(204).json(`Question With ID ${_id} Was Successfully Deleted`);
    }
 } catch (error) {
     return res.status(500).json({"Error": error});
  } 
   })



module.exports = Quizrouter;