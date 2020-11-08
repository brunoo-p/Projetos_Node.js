import { promises as fs } from 'fs';
import {getTimestamp} from './timestampController.js';

export async function newInsert(grade){
  try{
    const data = JSON.parse(await fs.readFile(global.gradesFile));
    let time = await getTimestamp();
    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: time
    }
    data.grades.push(grade);
    
    await fs.writeFile(global.gradesFile, JSON.stringify(data, null, 2));
    return(grade);
  }catch(err){
    console.log(err.message)
  }
}


export async function getId(id){
  const data = JSON.parse(await fs.readFile(global.gradesFile));
  const search = data.grades.find(student => student.id === parseInt(id));
  
  return (search);
}


export async function getAverage(student, subject){
  let result = 0;
  const data = JSON.parse(await fs.readFile(global.gradesFile));
  let ratings = data.grades.filter(e => e.student === student);
  ratings = ratings.filter(ev => ev.subject === subject);
  
  for(const rating of ratings){
    result += (rating.value)/ratings.length;
  }
  return(result);
}


export async function handlerSubjectType(subject, type, array){
  const data = JSON.parse(await fs.readFile(global.gradesFile));
  let ratings = data.grades.filter(e => e.subject === subject);
  ratings = ratings.filter(ev => ev.type === type);
  
if(array){
    const better = [];
    for(const rating of ratings){
      better.push(rating);
    }
    better.sort((a,b) => a.value - b.value);
    return(better);
  }
  else{
    let result = 0;
    for(const rating of ratings){
      result += (rating.value)/ratings.length;
    }
    return(result);
  }
}
