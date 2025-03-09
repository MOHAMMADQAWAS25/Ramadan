import { useEffect, useState } from 'react'
function App() {
  const [city,setCity]=useState('Hebron');
  const [date,setDate]=useState('');
  const [time,setTime]=useState('');
  const [times,setTimes]=useState([]);
  useEffect(()=>{
    let x = new Date();
    x=x.toString();
    x=x.split(' ');
    let counter=setInterval(()=>{let y = new Date();y=y.toString();y=y.split(' ');setTime(y[4]);},1000);
    x=x[0]+' '+x[1]+'-'+x[2]+'-'+x[3];
    setDate(x);
   return ()=>{
      clearInterval(counter);
   } 
  },[])
  useEffect(()=>{
    console.log(city);
    const get=async()=>{
      try {
       let x=`https://api.aladhan.com/v1/timingsByCity/24-02-2025?city=${city}&&country=Palestine`
       let response=await fetch(x) 
       if(!response.ok){
        return ;
       }
       let data=await response.json();
       if(data.code!=200 || data.status.toLowerCase()!='ok'){
           return ;
       }
      } catch (error) {
       console.log(error); 
      }
    }
    get();
  },[city])
  return (
    <div className='main'>
      <div className="container">
          <div className="one">
            <h1>Select Your City:</h1>
            <select onChange={(e)=>{let x = e.target.value;setCity(x);console.log(city)}}>
              <option value={'Hebron'}>hebron</option>
              <option value={'Jerusalem'}>Jerusalem</option>
              <option value={'Ramallah'}>Ramallah</option>
              <option value={'Nablus'}>Nablus</option>
              <option value={'Bethlehem'}>Bethlehem</option>
            </select>
          </div>
          <div className="two">
            <div className="DateTime">
              <div className="date">{date}</div>
              <div className="time">{time}</div>
            </div>
            <div className="Times">

            </div>
          </div>
      </div> 
    </div>
  )
}

export default App
