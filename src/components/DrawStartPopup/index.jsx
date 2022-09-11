import { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "../ActivityInicator";
import { Button } from "../Button";
import { HeaderPopup } from "../HeaderPopup";
import "./styles.css";

import { ScrowView } from "../ScrowView";
import { ApiAccess, ApiURIs } from "../../services/ApiAccess";
import { UserMetricCard } from "../UserMetricCard";

import imgDrawResult from "../../assets/pessoasfelizes.gif";
import { popupContext } from "../../context/PopupContext";

export const DrawStartPage = ()=>
{
    const [loading, setLoading] = useState(false);

    const [metrics, setMetrics] = useState({}); //mostrar quantas pessoas escolheram seus números
    const [userData, setUserData] = useState([]);
    const [message, setMessage] = useState("");
    
    const [hasSucessInitDraw, setHasSucessInitDraw] = useState(false);

    const [sortingLoading, setSortingLoading] = useState(false);

    const [winner, setWinner] = useState("");
    const [sortedNumber, setSortedNumber] = useState("");

    const {refresh, setrefresh } = useContext(popupContext);

    async function getMetrics()
    {
        setLoading(true);

        const response = await ApiAccess.get(ApiURIs.users.getMetrics);

        setMetrics(response.data);
        setUserData(response.data.userData);
        
        setLoading(false);
    }

    function countNumbers()
    {
        let count = 0;

        userData.map((user)=>{
            if(user.currentNumbers.length > 0)
                count = count + 1;
        })

        return count;
    }

    async function handleInitDraw()
    {
        if(countNumbers() == 0)
        {
            setMessage("nenhum dos usuários escolheram seus números");
            return;
        }

        setHasSucessInitDraw(true);
        setSortingLoading(true);

        const response = await ApiAccess.get(ApiURIs.lottery.start);

        if(response.data != null)
        {
            const { winnerResult } = response.data;

            setWinner( winnerResult.fullName );
            setSortedNumber( response.data.sortedNumber);

        }

        setSortingLoading(false);
        setrefresh(!refresh);

    }

    useEffect(()=>{ getMetrics() }, []);

    return (

        <div className="DrawStartPage">
            <HeaderPopup title={'Sorteio'} />

            <div className="MainContainer">
            {
                loading ? <ActivityIndicator/>
                :
                hasSucessInitDraw === false ?

                <div className="Metrics">

                    <span>total de usuários ativos: <h2>{metrics.userCount}</h2> </span>

                    <span>total de usuários que escolheram números: 
                        <h2>{countNumbers()}</h2> 
                    </span>   

                    <div className="UserData">
                        <ScrowView>
                        {
                            userData.map((item)=>
                            {
                                return <UserMetricCard 
                                    key={item.phone}
                                    fullName={item.fullName}
                                    phone={item.phone}
                                    currentNumbers={item.currentNumbers} 
                                    />
                            })
                        }
                        </ScrowView>
                    </div>  

                    <span id="alert">{ message != "" && <h2>{message}</h2> }</span>
            
                    <Button 
                        text={'Iniciar'} 
                        bgColor={'var(--primary)'} t
                        textColor={'white'}
                        pressAction={()=>{ handleInitDraw() }}
                    />
                </div>
                :
                <div className="DrawResult">
                {
                    sortingLoading ? <ActivityIndicator/>
                    :
                    <div>
                        <img src={imgDrawResult} />
                        <span>Número sorteado: <h1>{sortedNumber}</h1> </span>
                        <span>Vencedor: <h1>{winner}</h1> </span>
                    </div>
                }
                </div>

            }
            </div>

        </div>
    )
}