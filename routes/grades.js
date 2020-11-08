import {promises as fs} from 'fs';
import express from 'express';
import {newInsert, getId, getAverage, handlerSubjectType} from '../Controller/gradesController.js';

const router = express.Router();

//REGISTERED
router.post("/", async (request, response, next) =>{
  try{
    let grade = request.body;

    if((!grade.student)||(!grade.subject)){
      response.send("Verifique os campos. 'Student' e 'Subject' são obrigatórios.");
      response.end();
    }
    else if((!grade.type)||(grade.value == "")){
      response.send("Verifique os campos. 'Type' e 'Value' são obrigatórios.");
      response.end();
    }

    const data = await newInsert(grade);
    console.log(data);
    if(data){
      response.send("Registered Succefully");
    }
  }catch(err){
    console.log(err);
    next(err);
  }
});

//GET ALL
router.get("/", async (_, response, next) =>{
  try{ 
    const data = JSON.parse(await fs.readFile(global.gradesFile));
    response.send(data.grades);
    response.end()
  }catch(err){
    console.log(err); next(err);
  }
});

//GET ID
router.get("/:id", async (request, response, next) => {
  try{
    const search = await getId(request.params.id)
    response.send(search);
  }catch(err){
    console.log(err); next(err);
  }
});

//GET AVERAGE STUDENT
router.get("/seeNoteStudent/:student/:subject", async (request, response, next) => {
  try{
    if((!request.params.student)||(!request.params.subject)){
      response.send("Informe parâmetros válidos.");
    }

    const result = await getAverage(request.params.student, request.params.subject)
    response.send(`[${request.params.student}] Média: ${result.toFixed(2)}`);

  }catch(err){
    console.log(err); next(err);
  }
});

// GET AVERAGE SUBJECT AND TYPE
router.get("/seeAverageSubject/:subject/:type", async (request, response, next) => {
  try{
    if((!request.params.subject)||(!request.params.type)){
      response.send("Informe parâmetros válidos.");
    }
    
    const result = await handlerSubjectType(request.params.subject, request.params.type)
    response.send(`[${request.params.subject}] Média: ${result.toFixed(2)}`);    
  
  }catch(err){
    console.log(err); next(err);
  }
});

// BETTER VALUES
router.get("/betterValue/:subject/:type", async (request, response, next) => {
  if((!request.params.subject)||(!request.params.type)){
    response.send("Informe parâmetros válidos.");
  }
  const better = await handlerSubjectType(request.params.subject, request.params.type, true)
  response.send(better.slice(0, 3));
});


//UPDATE
router.put("/", async (request, response, next) =>{
  try{
    const grade = request.body;
    const data = JSON.parse(await fs.readFile(global.gradesFile));
    const index = data.grades.findIndex(student => student.id === grade.id);
    
    data.grades[index] = grade;
    
    await fs.writeFile(global.gradesFile, JSON.stringify(data, null, 2));
    response.send("Successfully Changed.");
  }catch(err){
   /*  console.log(err); */ next(err);
  }
});

//DELETE 
router.delete("/:id", async (request, response, next) => {
  try{
    const data = JSON.parse(await fs.readFile(global.gradesFile));
    data.grades = data.grades.filter(student => student.id !== parseInt(request.params.id));
    await fs.writeFile(global.gradesFile, JSON.stringify(data, null, 2));
    
    response.send("Deleted Record");
  }catch(err){
    console.log(err); next(err);
  }
});

router.use((err, request, response, next) =>{
  response.status(400).send({error: err.message});
});

export default router