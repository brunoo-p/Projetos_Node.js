import {promises as fs} from 'fs'
//CRIAR ARQUIVOS DE CADA ESTADO 
export async function create(){
  const states = JSON.parse(await fs.readFile("./DADOS/Estados.json"));
  const cities = JSON.parse(await fs.readFile("./DADOS/Cidades.json"));

  for(let i = 0; i < states.length; i++){
    const filterCities = cities.filter(city => city.Estado === states[i].ID);
    await fs.writeFile(`./states/${states[i].Sigla}.json`, JSON.stringify(filterCities));
  }
}
//CONTAR A QUANTIDADE DE CIDADES
export async function countCities(uf){
  const data = JSON.parse(await fs.readFile(`./states/${uf}.json`));
  return data.length;
}
//5 ESTADOS COM MAIS CIDADES E 5 ESTADOS COM MENOS CIDADES
export async function statesMoreCities(more){
  const states = JSON.parse(await fs.readFile(`./DADOS/Estados.json`));
  const list = [];

  for(const state of states){
    const count = await countCities(state.Sigla);
    list.push({uf: state.Sigla, count});
  }
  const result = [];
    if(more){
      list.sort((a,b)=> a.count - b.count).slice(0, 5).forEach(item => 
        result.push(`${item.uf} - ${item.count}`));
    }
    else if(!more){
      list.sort((b,a)=> a.count - b.count).slice(0, 5).forEach(item => 
        result.push(`${item.uf} - ${item.count}`));
    }
  console.log(result);
}
//GERENCIAR CONTAGEM DE NOME
export async function getBiggerName(uf){
  const cities = JSON.parse(await fs.readFile(`./states/${uf}.json`));
  let result;
  cities.forEach(city => {
    if(!result){
      result = city;
    }
    else if(city.Nome.length > result.Nome.length){
      result = city
    }
    else if((city.Nome.length === result.Nome.length) && (city.Nome.toLowerCase() < result.Nome.toLowerCase())){
      result = city
    }
  });
  return result;
}
//PEGAR CIDADE COM MAIOR NOME E CIDADE COM MENOR NOME DE CADA ESTADO 
export async function getBiggerOrSmallerNameCities(bigger){
  const states = JSON.parse(await fs.readFile('./DADOS/Estados.json'));
  const result = [];
  
  for(const state of states){
    let city;

    if(bigger){
      city = await getBiggerName(state.Sigla);
    }
    else if(!bigger){
      city = await getSmallerName(state.Sigla)
    };   
    result.push(`${city.Nome} - ${state.Sigla}`);
  }
  console.log(result)
}
//MENOR NOME DE TODOS OS ESTADS 
export async function getSmallerName(uf){
  const cities = JSON.parse(await fs.readFile(`./states/${uf}.json`));
  let result;
  cities.forEach(city => {
    if(!result){
      result = city;
    }
    else if(city.Nome.length < result.Nome.length){
      result = city
    }
    else if((city.Nome.length === result.Nome.length) && (city.Nome.toLowerCase() < result.Nome.toLowerCase())){
      result = city
    }
  });
  return result;
}
//CIDADE COM MAIOR NOME ENTRE TODOS OS ETADOS
export async function biggerCity(){
  const cities = JSON.parse(await fs.readFile('./DADOS/Cidades.json'));
  let result;
  cities.forEach(city => {
    if(!result){
      result = city;
    }
    else if(city.Nome.length > result.Nome.length){
      result = city
    }
    else if((city.Nome.length === result.Nome.length) && (city.Nome.toLowerCase() < result.Nome.toLowerCase())){
      result = city
    }
  });
  console.log(result);
}
