import { useState ,useEffect} from "react";
const Time=()=>{
    const [time,setTime]=useState('');
    useEffect(()=>{
    let x = new Date();
    x=x.toString();
    x=x.split(' ');
    let y = new Date();y=y.toString();y=y.split(' ');setTime(y[4]);
    let counter=setInterval(()=>{let y = new Date();y=y.toString();y=y.split(' ');setTime(y[4]);},1000);
    x=x[0]+' '+x[1]+'-'+x[2]+'-'+x[3];
   return ()=>{
      clearInterval(counter);
   } 
  },[])
    return(
        <div className="time">{time}</div>
    )
}
export default Time;