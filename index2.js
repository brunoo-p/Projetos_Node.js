import {promises as fs} from 'fs';
const nomes = ['bruno','paulino'];
start();

async function start() {
  try{
    await fs.readFile("usuarios.txt","utf-8");
  }catch(err)
  {
    console.log(err);
  }
}

/* import readline from 'readline';

export function pergunta(){
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

  rl.question("ta bão? ", resposta =>{
    console.log(resposta);
    rl.close();
  });
} */

import http from 'http'

http.createServer((request, response) => {
  if((request.method === 'GET') && (request.url === "/usuarios")){
    response.write(usuarios.txt);
  }
  else{
    response.write("erro");
  }
  response.statusCode = 200;
  response.end();
}).listen(8080);

