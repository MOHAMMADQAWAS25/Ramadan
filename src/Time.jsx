import { useState ,useEffect} from "react";
const Time=()=>{
    const [time,setTime]=useState('');
    useEffect(()=>{
    let y = new Date();y=y.toString();y=y.split(' ');setTime(y[4]);
    let counter=setInterval(()=>{let y = new Date();y=y.toString();y=y.split(' ');setTime(y[4]);},1000);
   return ()=>{
      clearInterval(counter);
   } 
  },[])
    return(
        <div className="time">{time}</div>
    )
}
export default Time;