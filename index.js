import {create, statesMoreCities, getBiggerOrSmallerNameCities, biggerCity} from './criar.js'

start();

async function start(){
  try{
  await create();
  await statesMoreCities(true);
  await statesMoreCities(false);
  await getBiggerOrSmallerNameCities(true);
  await getBiggerOrSmallerNameCities(false);
  await biggerCity();
  }
  catch(err){
    console.log(err, "Nada Encontrado");
  }
}

