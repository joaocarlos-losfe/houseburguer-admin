import { useEffect, useState } from "react";
import { CardContainer } from "../../components/CardContainer";
import { DatePicker } from "../../components/DatePicker";
import { Input } from "../../components/Input";
import { SubmitFile } from "../../components/SubmitFile";
import { TextArea } from "../../components/TextArea";
import "./styles.css";

import { ActivityIndicator } from "../../components/ActivityInicator";
import { ScrowView } from "../../components/ScrowView";
import { ApiAccess, ApiURIs } from "../../services/ApiAccess";
import { DrawCard } from "../../components/DrawCard";
import { Button } from "../../components/Button";

import { isEmptyOrSpaces, validPhone } from "../../utils/Validators";

import { useContext } from "react";
import { popupContext } from "../../context/PopupContext";


export const DrawPage = ()=>
{
    const [loadingDraw, setLoadingDraw] = useState(false);
    const [previusDraw, setPreviusDraw] = useState([]);
    const [loadingSubmit, setLoadindSubmit] = useState(false);
    const [message, setMessage] = useState("");

    const [date, setDate] = useState("");
    const [award, setAward] = useState("");
    const [description, setDesciption] = useState("");
    const [file, setFile] = useState(undefined);

    const [lastLottery, setLastLottery] = useState({});
    const [loadLastLottery, setLoadLastLottery] = useState(false);

    const {refresh, setShowPopup, setPopupItem } = useContext ( popupContext );


    async function getPreviusDraw()
    {
        setLoadingDraw(true);

        const response = await ApiAccess.get(ApiURIs.lottery.get);
        setPreviusDraw(response.data.data)

        setLoadingDraw(false);
    }

    async function loadLottery()
    {
        setLoadLastLottery(true);

        const response = await ApiAccess.get(ApiURIs.lottery.getLast);

        const { item } = response.data ;

        setLastLottery(item);
        setLoadLastLottery(false);
        
    }

    async function handleSubmit()
    {
        if ( isEmptyOrSpaces(date) || isEmptyOrSpaces(award) || isEmptyOrSpaces(description) || file == undefined )
        {
            setMessage("alguns ou mais campos estão vazios...");
            return;
        }

        setLoadindSubmit(true);

        const formData = new FormData();

        formData.append("date", new Date(date).getTime().toString());
        formData.append("award", award);
        formData.append("description", description);
        formData.append("file", file);

        const response = await ApiAccess.post(ApiURIs.lottery.create, formData);

        setLoadindSubmit(false);

        await getPreviusDraw();
        await loadLottery();

    }

    function startDraw()
    {

        setPopupItem("DrawStartModal");
        setShowPopup(true);
    }

    useEffect(() => { loadLottery() }, []);

    useEffect(()=>{ getPreviusDraw() }, []);

    useEffect(()=> { loadLottery() && getPreviusDraw() }, [refresh]);

    return (
    <div className="DrawPage">
        {
            loadLastLottery ? <ActivityIndicator/> 
            :
            lastLottery && !lastLottery.winner ? 

            <CardContainer title={'Há um sorteio agendado'} >

                <div className="LastDrawContainer">
                    <span>Data do sorteio: <h2>{new Date(lastLottery.date).toLocaleString()}</h2> </span>
                    <span>Premio: <h2>{ lastLottery.award }</h2> </span>
                    <span>Descrição: <h2>{ lastLottery.award }</h2> </span>
                    <img src={ lastLottery.referenceImageUrl } />
                </div>

                <div className="ButtonActions">
                    <Button 
                        text={'Iniciar sorteio'} 
                        bgColor={'var(--primary)'} t
                        textColor={'white'}
                        pressAction={()=>{ startDraw() }}
                    />

                    <Button 
                        text={'Cancelar sorteio'} 
                        bgColor={'var(--secondary)'} t
                        textColor={'white'}
                        pressAction={()=>{  }}
                    />
                </div>


            </CardContainer>
            :
            <CardContainer title={'Cadastrar novo sorteio'}>
                <DatePicker setData={setDate} />

                <Input
                    inputDataValue={award}
                    setInputData={setAward}
                    placeholder={'Premio'}
                    type='text'
                />

                <TextArea
                    inputDataValue={description}
                    setInputData={setDesciption}
                    placeholder={'Descrição'}
                    type='text'
                />

                <SubmitFile
                    setFilePath={setFile}
                />

                <span id="err-message">{message}</span>

                <div className="ButtonActions">
                {
                    loadingSubmit ? <ActivityIndicator/>
                    :
                    <Button 
                        text={'Salvar'} 
                        bgColor={'var(--primary)'} t
                        textColor={'white'}
                        pressAction={()=>{ handleSubmit()  }}
                    />
                }
                </div>
                

        </CardContainer>

        }

        

        <CardContainer title={'Sorteios Anteriores'} >
            <ScrowView>
            {
                loadingDraw ? <ActivityIndicator/>
                :
                previusDraw.map(item=>
                {
                    return <DrawCard 
                    key={item._id} 
                    award={item.award}
                    date={item.date}
                    createdAt={item.createdAt}
                    description={item.description}
                    winner={item.winner}
                    referenceImageUrl={item.referenceImageUrl}
                    />
                })
            }
            </ScrowView>
        </CardContainer>

    </div>
    )
}