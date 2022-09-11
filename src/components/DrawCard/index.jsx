import "./styles.css";

export const DrawCard = ({award, referenceImageUrl, date, createdAt, description, winner})=>
{
    return (
        <div className="DrawCard">
            <h1>{award}</h1>
            <div className="CardData">
                {referenceImageUrl && <img src={referenceImageUrl} alt="burguer figure" />}
                <div className="Data">
                    <h2> <span>Data definida do sorteio: </span> {new Date(date).toLocaleString()}</h2>
                    <h2> <span>Data de ocorrencia: </span> {new Date(createdAt).toLocaleString()}</h2>

                    { description &&  <h2> <span>Descrição: </span> {description}</h2> }


                    { 
                        winner ?  <h2> <span>Vencedor: </span> {winner}</h2> 
                        : 
                        <h2> sorteio não realizado </h2> 
                    }
                </div>

            </div>
        </div>
    )
}