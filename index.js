import {promises as fs} from 'fs';
import express from 'express';
import gradesRouter from './routes/grades.js'

const app = express();
app.use(express.json());
app.use("/grades", gradesRouter);

global.gradesFile = "./_data/grades.json"

app.listen(3001, async () =>{
  try{
    await fs.readFile(global.gradesFile);
  }
  catch(err){
    const initialJson = {
      nextId: 1,
      grades: []
    };
    await fs.writeFile(global.gradesFile, JSON.stringify(initialJson));
  }
  console.log("API Started!");
});