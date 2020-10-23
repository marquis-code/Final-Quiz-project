const express = require('express');
const Quizrouter = express.Router();
const Quiz = require('../models/Quiz');


//Create a new question
  Quizrouter.post('/questions', async (req, res)=>{
    const { question,optionA, optionB, optionC, optionD, answer, category } = req.body;

   const data = { question,optionA, optionB, optionC, optionD, answer, category }
    
    const newQuestion = await Quiz.create(data);
   
    newQuestion.save()
    .then(()=>{
      res.status(201).json("Question was sucessfully saved to database");
    })
    .catch(()=>{
      res.status(400).json({'Error': "Sorry!!! Internal server Error"});
    });
 })

// Get All Questions
 Quizrouter.get('/questions', async (req, res)=>{
    const allQuestions =await Quiz.find().limit(30); //The limit helps to fetch limites amount of data fro MongoDb
    return res.status(200).json(allQuestions);
  });

//Get one Question

Quizrouter.get('/questions/:id', async(req, res) => {  
  const _id = req.params.id;                                                            
   const question = await Quiz.findOne({_id});
   if(!question){
     return res.status(404).json(`Question With ID ${_id} Does Not Exist`);
   }else{
     return res.status(200).json(question);
   } 
  });

// Update Question
Quizrouter.put('/questions/:id', async (req, res) => {
        const { question,optionA, optionB, optionC, optionD, answer, category  } = req.body;
        const _id = req.params.id;

        let questions = await Quiz.findOne({_id});

        if(!questions){
          
            const newQuestionUpdate = Quiz.create({
              category, question, optionA, optionB, optionC, optionD, answer
          }); 
           
            res.status(200).json(`Question with ID ${_id} was not found; a new question was created`);
        }else{
            questions.category = category;
            questions.question = question;
            questions.optionA = optionA;
            questions.optionB = optionB;
            questions.optionC = optionC;
            questions.optionD = optionD;
            questions.answer = answer;
            await questions.save();
            return res.status(200).json(questions);
        }
});

//Delete a Question

Quizrouter.delete('/questions/:id', async (req, res) => {
    const _id = req.params.id;
    const question =await Quiz.deleteOne({_id}).exec();
    if(question.deletedCount === 0){
       return res.status(404).json(`Question With ID ${_id} does not Exist`);
    }else{
       res.status(200).json( `Question With ID ${_id} Was Successfully Deleted`);
      }
   })
module.exports = Quizrouter;