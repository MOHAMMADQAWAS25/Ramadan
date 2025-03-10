import { useEffect, useState } from 'react'
import Card from './Card';
import Time from './Time';
import logo from '../public/ramadan.svg';
function App() {
  const [city,setCity]=useState('Hebron');
  const [date,setDate]=useState('');
  const [times,setTimes]=useState({});
  const [names,setNames]=useState(["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Sunset", "Isha"]);
  useEffect(()=>{
    let x = new Date();
    x=x.toString();
    x=x.split(' ');
    x=x[0]+' '+x[1]+'-'+x[2]+'-'+x[3];
    setDate(x);
  },[])
  useEffect(()=>{
    console.log(city);
    const get=async()=>{
      try {
       let x=`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Palestine`;
       let response=await fetch(x) 
       if(!response.ok){
        return ;
       }
       let data=await response.json();
       if(data.code!=200 || data.status.toLowerCase()!='ok'){
           return ;
       }
       setTimes(data.data.timings);
      } catch (error) {
       console.log(error); 
      }
    }
    get();
  },[city])
  return (
    <div className='main'>
    <div className="nav">
      <div className="icon">
        <img src={logo}/>
      </div>
      <div className="date">{date}</div>
      <div className="slide">
        <select onChange={(e)=>{let x = e.target.value;setCity(x);console.log(city)}}>
          <option value={'Hebron'}>hebron</option>
          <option value={'Jerusalem'}>Jerusalem</option>
          <option value={'Ramallah'}>Ramallah</option>
          <option value={'Nablus'}>Nablus</option>
          <option value={'Bethlehem'}>Bethlehem</option>
        </select>
      </div>
    </div>
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
              <Time/>
              <div className='city'>{city}</div>
              <div className="date">{date}</div>
            </div>
            <div className="Times">
              {
                names.map((value,index)=>{
                  return <Card key={index} name={value} time={times[value]}/>
                })
              }
            </div>
          </div>
      </div> 
    </div>
  )
}

export default App
