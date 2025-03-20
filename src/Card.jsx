const Card=(props)=>{
    return(
        <div className="card">
            <div className="name">{props.name}</div>
            <div className="time">{props.time}</div>
        </div>
    )
}
export default Card;