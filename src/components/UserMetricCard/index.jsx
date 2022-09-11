import "./styles.css";

export const UserMetricCard = ({fullName, phone, currentNumbers})=>
{
    return (
        <div className="UserMetricCard">
            <span>Cliente: <h2>{fullName}</h2>  </span> 
            <span>Whatsapp: <h2>{phone}</h2> </span> 
            <span>Números escolhidos:  </span>
            <h2>[{currentNumbers.map((n)=>{ return ' ' + n })} ]</h2>
        </div>
    )
}