export async function getTimestamp(){
  try{

    let time = new Date();
    let timestamp = '';
    
    timestamp += time.getFullYear() + '-';
    timestamp += time.getMonth() + '-';
    timestamp += time.getDate() + 'T';
    timestamp += time.getHours() + ':';
    timestamp += time.getMinutes() + ':';
    timestamp += time.getSeconds() + '.';
    timestamp += time.getMilliseconds();
    
    return timestamp;
  }catch(err){
    console.log(err.message);
  }
}