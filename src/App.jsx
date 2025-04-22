import { useEffect, useRef, useState } from 'react'
import Card from './Card';
import Time from './Time';
import MenuIcon  from '../public/ramadan.svg'
import loadingIcon from '../public/loading.svg';
function App() {
  const Control=useRef(null);
  const [loading,setLoading]=useState(true);
  const [city,setCity]=useState('Hebron');
  const [date,setDate]=useState('');
  const [times,setTimes]=useState({});
  const [names,setNames]=useState(["Fajr", "Sunrise", "Dhuhr", "Asr", , "Sunset","Maghrib", "Isha"]);
  const [nextTime,setNextTime]=useState("");
  const [nextValue,setNextValue]=useState(0);
  const [EditedTimes,setEditedTimes]=useState({});
  useEffect(()=>{
    let counter=setInterval(()=>{

    },1000*60)
    return ()=>{
      clearInterval(counter);
    }
  })
  useEffect(()=>{
    let x = new Date();
    x=x.toString();
    x=x.split(' ');
    x=x[0]+' '+x[1]+'-'+x[2]+'-'+x[3];
    setDate(x);
  },[])
  useEffect(()=>{
    if(loading){
      Control.current.style.display='flex';
    }
    else{
      Control.current.style.display='none';
    }
  },[loading])
  useEffect(()=>{
    setLoading(true);
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
       let test1=data.data.timings;
       let test={};
       names.forEach((value)=>{
        test[value]=test1[value]+":00";
       })
       setEditedTimes({...test});
       setLoading(false);
       
      } catch (error) {
       console.log(error); 
      }
    }
    get();
  },[city])
  //I mean here
  useEffect(()=>{
    let enter=false;
    let cho;
    let cho2;
        for(let i = 0; i < names.length; i++){
        let y = new Date();y=y.toString();y=y.split(' ');     
        let value=names[i];
        let x = EditedTimes[value];
        if(y[4]<x){
          console.log(value);
          setNextTime(value);
          enter=true;
          cho=x;
          cho2=y[4];
          break;
         }
        }
        if(!enter){
          setNextTime('Fajr');
        }
        let time1=new Date(`2025-04-22T${cho2}`);
        let time2=new Date(`2025-04-22T${cho}`);
        let differenceInMilliseconds = time2 - time1;

        let differenceInSeconds = differenceInMilliseconds / 1000;

        let hours = Math.floor(differenceInSeconds / 3600);  
        let minutes = Math.floor((differenceInSeconds % 3600) / 60);  
        let seconds = Math.floor(differenceInSeconds % 60);
        let formattedTimeDifference = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        setNextValue(formattedTimeDifference);
        console.log(`Time Difference: ${formattedTimeDifference}`);
   let counter=setInterval(()=>{
    let enter=false;
    let cho;
    let cho2;
        for(let i = 0; i < names.length; i++){
        let y = new Date();y=y.toString();y=y.split(' ');     
        let value=names[i];
        let x = EditedTimes[value];
        if(y[4]<x){
          console.log(value);
          setNextTime(value);
          enter=true;
          cho=x;
          cho2=y[4];
          break;
         }
        }
        if(!enter){
          setNextTime('Fajr');
        }
        let time1=new Date(`2025-04-22T${cho2}`);
        let time2=new Date(`2025-04-22T${cho}`);
        let differenceInMilliseconds = time2 - time1;

        let differenceInSeconds = differenceInMilliseconds / 1000;

        let hours = Math.floor(differenceInSeconds / 3600);  
        let minutes = Math.floor((differenceInSeconds % 3600) / 60);  
        let seconds = Math.floor(differenceInSeconds % 60);
        let formattedTimeDifference = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        setNextValue(formattedTimeDifference);
        console.log(`Time Difference: ${formattedTimeDifference}`);

    },1000);
    return ()=>{
      clearInterval(counter);
    }
  },[EditedTimes])
  return (
    <div className='main'>
    <div className='loadingScreen' ref={Control}>
      <img src={loadingIcon} />
    </div>
    <div className="nav">
      <div className="icon">
        <img src={MenuIcon}/>
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
                  if(value!=nextTime)
                  {return <Card key={index} name={value} time={times[value]} classNamE={'no'} vv={0}/>}
                  else{
                    return <Card key={index} name={value} time={times[value]} classNamE={'yes'} vv={nextValue}/> 
                  }
                  
                })
              }
            </div>
          </div>
      </div> 
    </div>
  )
}

export default App
