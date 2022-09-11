import "./styles.css";

export const DatePicker = ({setData}) =>
{
    return(
        <input className="DatePicker" type="datetime-local" onChange={(e)=>{ setData(e.target.value)}} />
    )
}